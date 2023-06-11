import '../index.css'
import { useAuth0 } from "@auth0/auth0-react";

export default function SigIn() {

const { loginWithRedirect, isLoading, error } = useAuth0();

  if (error) {
    return <div>Error</div>
  }

  if (isLoading) {
    return <div className="flex items-center justify-center w-full h-screen"><span className="loader"></span></div>
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='font-bold text-5xl'>Welcome to my <span className='text-cyan-400'>Task List</span></h1>
      <img src="/home.svg" alt="no task icon" className='w-96'/>
      <div className='flex flex-row w-full items-center justify-center px-20'>
      <button
        className="uppercase bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btnlogin"
        onClick={() => {loginWithRedirect(); window.location.reload()}}
      >
        Sign in
      </button>
      </div>
    </main>
  )
}
