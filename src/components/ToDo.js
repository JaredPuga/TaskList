import { useTask } from "../hooks/useTask";

export default function ToDo({task}) {

  const {title, completed, id} = task

  const {handleSetCompleteTask, handleDeleteTask, handleUpdateTask} = useTask()

  return (
    <div className="flex items-center justify-between p-4 bg-gray-700 border-b border-solid border-gray-600">
        <div className="flex items-center" onClick={() => handleSetCompleteTask(id, completed)}>
            {!completed ? 
              <span className="border-solid border border-gray-500 rounded-full p-3 cursor-pointer"></span> 
              : 
              <div className="bg-green-400 rounded-full cursor-pointer">
                <img className="h-7 w-7" src="/check.svg" alt="completed"/>
              </div>
            }
            <p className={`pl-3 ` + (completed && 'line-through')}>
                {title}
            </p>
        </div>
        <div className="flex gap-3">
        <img src="/edit.svg" alt="edit task"
          className="h-7 w-7 cursor-pointer"
          onClick={() => handleUpdateTask(id)}
        />
        <img src="/delete.svg" alt="delete task" 
          className="h-7 w-7 cursor-pointer transition-all duration-300 ease-in"
          onClick={() => handleDeleteTask(id)}
        />
        </div>
    </div>
  );
}