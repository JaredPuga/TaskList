import { useState } from "react";
import { useTask } from "../hooks/useTask";
import ToDo from "./ToDo";
import ToDoFilter from "./ToDoFilter";
import NoTasks from "./NoTasks";

function ToDoList() {
  
  const [newTask, setNewTask] = useState("");
  const { FilteredTask, addTask} = useTask()

  const addNewTask = () => {
    addTask(newTask);
    setNewTask("");
  }

  const keyEnter = (e) => {
    e.keyCode === 13 && addNewTask()
  }

  return (
    <div className="mx-auto mt-8 p-4 shadow-md w-10/12 border-2 border-solid rounded-lg shadow-cyan-500 border-white">
      <h1 className="text-2xl font-bold mb-4">Task to do</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Type some task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => keyEnter(e)}
          className="flex-grow border border-gray-400 rounded-l py-2 px-4 mr-2 focus:outline-none text-black"
        />
        <button
          onClick={addNewTask}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
        >
          Add Task
        </button>
      </div>

      <div className="flex flex-col mt-7 rounded-lg overflow-hidden shadow-2xl">
        <ToDoFilter 
          count={FilteredTask.length}
        />
        {
          FilteredTask.length === 0 && <NoTasks />
        }
        {FilteredTask.map((task) => (
          <ToDo
            key={task.id}
            task={task}
          />
        ))}
      </div>
    </div>
  );
}

export default ToDoList;
