import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


const { createContext } = require("react");

const TaskContext = createContext()


const TaskProvider = ({children}) => {

    const [tasks, setTasks] = useState([
        {
          id: 1,
          title: "Hacer las tareas",
          completed: false,
        },
        {
          id: 2,
          title: "Dormir",
          completed: true,
        },
        {
          id: 3,
          title: "Comer",
          completed: true,
        },
        {
          id: 4,
          title: "Terminar todo",
          completed: false,
        },
      ]);
    
      const [activeFilter, setActiveFilter] = useState("all");
      const [FilteredTask, SetFilteredTask] = useState(tasks);
    
      const addTask = (title) => {
        const lastId = tasks.length > 0 ? tasks[tasks.length - 1].id : 1; //Eliminar cuando tenga la bd
    
        const newTask = {
          id: lastId + 1,
          title,
          completed: false,
        };
    
        const taskList = [...tasks];
        taskList.push(newTask);
    
        setTasks(taskList);
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