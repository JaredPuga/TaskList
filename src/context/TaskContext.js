import { gql, useApolloClient } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const { createContext } = require("react");

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const { user } = useAuth0();
  const [tasks, setTasks] = useState([]);
  const client = useApolloClient();
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
    };
    fetchData();
  }, [client, user]);

  const [activeFilter, setActiveFilter] = useState("all");
  const [FilteredTask, SetFilteredTask] = useState(tasks);

  const addTask = async (title) => {
    try {
      const mutation = gql`
            mutation {
              taskCreate(data: {title: "${title}", email:"${user.email}", user_name: "${user.name}"}) {
                  id
                  title
                  completed
              }
            }
      `;

      const response = await client.mutate({
        mutation,
      });

      const taskList = [...tasks];
      taskList.push(response.data.taskCreate);
      setTasks(taskList);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSetCompleteTask = async(id, completed) => {
    const updatedList = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    try {
      const mutation = gql`
          mutation UpdateTaskCompletion {
            taskUpdate(data: { id: "${id}", completed: ${!completed} }) {
              id
              completed
            }
          }
      `;

      const response = await client.mutate({
        mutation,
      });

      const taskList = [...tasks];
      taskList.push(response.data.taskUpdate);
      setTasks(taskList);
    } catch (error) {
      console.error("Error:", error);
    }

    setTasks(updatedList);
  };

  const handleDeleteTask = async(id) => {
    const updatedList = tasks.filter((task) => task.id !== id);
    try {
      const mutation = gql`
      mutation DeleteTask {
        taskDelete(data: { id: "${id}" }) {
          success
        }
      }
    `;

      const response = await client.mutate({
        mutation,
      });

      const taskList = [...tasks];
      taskList.push(response.data.taskDelete);
      setTasks(taskList);
    } catch (error) {
      console.error("Error:", error);
    }
    setTasks(updatedList);
    toast.error("Task deleted!");
  };

  const handleUpdateTask = async (id) => {
    const oldTask = tasks.filter((task) => task.id === id);

    const { value: newTitle } = await Swal.fire({
      title: "Edit task",
      input: "text",
      inputValue: oldTask[0].title,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (newTitle) {
      const updatedList = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, title: newTitle };
        }
        return task;
    });

      try {
      const mutation = gql`
          mutation UpdateTaskCompletion {
            taskUpdate(data: { id: "${id}", title: "${newTitle}" }) {
              id
              title
            }
          }
      `;

      const response = await client.mutate({
        mutation,
      });

      const taskList = [...tasks];
      taskList.push(response.data.taskUpdate);
      setTasks(taskList);
    } catch (error) {
      console.error("Error:", error);
    }

    toast.success("Task updated!");
    setTasks(updatedList);
    }
  };

  const showAllTasks = () => {
    setActiveFilter("all");
  };

  const showToDoTask = () => {
    setActiveFilter("to do");
  };

  const showCompletedTask = () => {
    setActiveFilter("completed");
  };

  const handleDeleteCompleteTask = async() => {

    try {
      const mutation = gql`
      mutation DeleteAllTask {
        taskDeleteByFilter(filter: {email: {equals:"${user.email}"} }) {
          success
        }
    }
    `;

      const response = await client.mutate({
        mutation,
      });

      const taskList = [...tasks];
      taskList.push(response.data.taskDeleteByFilter);
      setTasks(taskList);
    } catch (error) {
      console.error("Error:", error);
    }

    setTasks([]);
  };

  useEffect(() => {
    if (activeFilter === "all") {
      SetFilteredTask(tasks);
    } else if (activeFilter === "to do") {
      const ToDoTasks = tasks.filter((task) => task.completed === false);
      SetFilteredTask(ToDoTasks);
    } else if (activeFilter === "completed") {
      const completedTasks = tasks.filter((task) => task.completed === true);
      SetFilteredTask(completedTasks);
    }
  }, [activeFilter, tasks]);

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
  );
};

export { TaskProvider };

export default TaskContext;
