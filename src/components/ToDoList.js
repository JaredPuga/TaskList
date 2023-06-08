import { useState } from 'react';
import ToDo from './ToDo';
import ToDoFilter from './ToDoFilter';

function ToDoList({tasks, addTask}) {
  
  const [newTask, setNewTask] = useState('');

  return (
    <div className="mx-auto mt-8 p-4 shadow-md w-10/12 border-2 border-solid rounded-lg shadow-cyan-500 border-white">
      <h1 className="text-2xl font-bold mb-4">Estas son las cosas por hacer</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder='Escribe algo'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow border border-gray-400 rounded-l py-2 px-4 mr-2 focus:outline-none text-black"
        />
        <button
          onClick={() => addTask(newTask)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
        >
          Add Task
        </button>
      </div>

      <div className="flex flex-col mt-7 rounded-lg overflow-hidden shadow-2xl">
        {
          tasks.map((task) => (
            <ToDo key={task.id} task={task} />
          ))
        }
        <ToDoFilter />
      </div>

    </div>
  );
}

export default ToDoList;
