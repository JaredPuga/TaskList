import { gql, useApolloClient } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const { createContext } = require("react");

const TaskContext = createContext()


const TaskProvider = ({children}) => {

  const { user } = useAuth0()
  const [tasks, setTasks] = useState([]);
  const client = useApolloClient()
    
    useEffect(() => {

      const fetchData = () => {
        client
          .query({
            query: gql`
              {
                tasksList(filter: { email: { equals: "${user?.email}" } }) {
                  items {
                    id
                    title
                    completed
                  }
                }
              }
            `,
          })
          .then((result) => setTasks(result.data.tasksList.items));
      }
      fetchData()
    }, [client, user])
        
    const [activeFilter, setActiveFilter] = useState("all");
    const [FilteredTask, SetFilteredTask] = useState(tasks);
    
    const addTask = async(title) => {
        
        try {
          const mutation = gql`
            mutation {
              taskCreate(data: {title: "${title}", email:"${user.email}"},) {
                  id
                  title
                  completed
              }
            }
          `;
                    
          const response = await client.mutate({
            mutation,
          });
          
          console.log('Respuesta:', response.data.taskCreate);
          const taskList = [...tasks];
          taskList.push(response.data.taskCreate);
          setTasks(taskList)
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      const handleSetCompleteTask = (id) => {
        const updatedList = tasks.map((task) => {
          if (task.id === id) {
            return { ...task, completed: !task.completed };
          }
          return task;
        });  
        setTasks(updatedList);
      };
    
      const handleDeleteTask = (id) => {
        const updatedList = tasks.filter((task) => task.id !== id);
        setTasks(updatedList);
        toast.error("Task deleted!");
      };
    
      const handleUpdateTask = async(id) => {
        const oldTask = tasks.filter(task => task.id === id);
    
        const {value: newTitle} = await Swal.fire({
          title: 'Edit task',
          input: 'text',
          inputValue: oldTask[0].title,
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return 'You need to write something!'
            }
          }
        })
    
        if (newTitle) {
          const updatedList = tasks.map((task) => {
            if (task.id === id) {
              return { ...task, title: newTitle };
            }
            return task;
          });
          toast.success("Task updated!");
          setTasks(updatedList);
        }
      }
    
      const showAllTasks = () => {
        setActiveFilter("all");
      };
    
      const showToDoTask = () => {
        setActiveFilter("to do");
      };
    
      const showCompletedTask = () => {
        setActiveFilter("completed");
      };
    
      const handleDeleteCompleteTask = () => {
        const updatedList = tasks.filter((task) => !task.completed);
        setTasks(updatedList);
      };
    
      useEffect(() => {
        if (activeFilter === 'all') {
          SetFilteredTask(tasks)
        } else if (activeFilter === 'to do') {
          const ToDoTasks = tasks.filter(task => task.completed === false)
          SetFilteredTask(ToDoTasks)
        } else if (activeFilter === 'completed') {
          const completedTasks = tasks.filter(task => task.completed === true)
          SetFilteredTask(completedTasks)
        }
    
      }, [activeFilter ,tasks])

    return (
        <TaskContext.Provider
            value={{
                tasks,
                FilteredTask,
                addTask,
                handleSetCompleteTask,
                handleDeleteTask,
                showAllTasks,
                showToDoTask,
                showCompletedTask,
                handleDeleteCompleteTask,
                activeFilter,
                handleUpdateTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}

export {
    TaskProvider
}

export default TaskContext