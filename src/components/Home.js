import { withAuthenticationRequired } from '@auth0/auth0-react'
import ToDoList from './ToDoList'
import Nav from './Nav'
import { useState } from 'react';

function Home() {

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Hacer las tareas',
      completed: false,
    },
    {
      id: 2,
      title: 'Dormir',
      completed: true,
    },
    {
      id: 3,
      title: 'Comer',
      completed: true,
    },
    {
      id: 4,
      title: 'Terminar todo',
      completed: false,
    },
  ]);

  const addTask = (title) => {
    const lastId = tasks.length > 0 ? tasks[tasks.length - 1].id : 1 //Eliminar cuando tenga la bd

    const newTask = {
      id: lastId + 1,
      title,
      completed: false,
    }

    const taskList = [...tasks]
    taskList.push(newTask)

    setTasks(taskList)
  }

  return (
    <>
      <Nav />
      <div className='w-full'>
        <ToDoList tasks={tasks} addTask={addTask}/>
      </div>
    </>
  )
}

export default withAuthenticationRequired(Home)
