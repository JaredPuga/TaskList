import { withAuthenticationRequired } from "@auth0/auth0-react";
import ToDoList from "./ToDoList";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Home() {
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
    <>
      <Nav />
      <div className="w-full">
        <ToDoList
          tasks={FilteredTask}
          addTask={addTask}
          handleSetCompleteTask={handleSetCompleteTask}
          handleDeleteTask={handleDeleteTask}
          showAllTasks={showAllTasks}
          showToDoTask={showToDoTask}
          showCompletedTask={showCompletedTask}
          handleDeleteCompleteTask={handleDeleteCompleteTask}
          activeFilter={activeFilter}
          handleUpdateTask={handleUpdateTask}
        />
      </div>
      <ToastContainer />
    </>
  );
}

export default withAuthenticationRequired(Home);
