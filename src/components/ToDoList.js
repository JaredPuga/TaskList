import { useState } from "react";
import ToDo from "./ToDo";
import ToDoFilter from "./ToDoFilter";
import NoTasks from "./NoTasks";

function ToDoList({
  tasks,
  addTask,
  handleSetCompleteTask,
  handleDeleteTask,
  showAllTasks,
  showToDoTask,
  showCompletedTask,
  handleDeleteCompleteTask,
  activeFilter,
  handleUpdateTask,
}) {
  const [newTask, setNewTask] = useState("");

  return (
    <div className="mx-auto mt-8 p-4 shadow-md w-10/12 border-2 border-solid rounded-lg shadow-cyan-500 border-white">
      <h1 className="text-2xl font-bold mb-4">Estas son las cosas por hacer</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Type some task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow border border-gray-400 rounded-l py-2 px-4 mr-2 focus:outline-none text-black"
        />
        <button
          onClick={() => {
            addTask(newTask);
            setNewTask("");
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
        >
          Add Task
        </button>
      </div>

      <div className="flex flex-col mt-7 rounded-lg overflow-hidden shadow-2xl">
        <ToDoFilter 
          count={tasks.length}
          showAllTasks={showAllTasks}
          showToDoTask={showToDoTask}
          showCompletedTask={showCompletedTask}
          handleDeleteCompleteTask={handleDeleteCompleteTask}
          activeFilter={activeFilter}
        />
        {
          tasks.length === 0 && <NoTasks />
        }
        {tasks.map((task) => (
          <ToDo
            key={task.id}
            task={task}
            handleSetCompleteTask={handleSetCompleteTask}
            handleDeleteTask={handleDeleteTask}
            handleUpdateTask={handleUpdateTask}
          />
        ))}
      </div>
    </div>
  );
}

export default ToDoList;
