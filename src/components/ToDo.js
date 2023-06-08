export default function ToDo({task}) {

  const {title, completed} = task

  return (
    <div className="flex items-center justify-between p-4 bg-gray-700 border-b border-solid border-gray-600">
        <div className="flex items-center">
            {!completed ? 
              <span className="border-solid border border-gray-500 rounded-full p-3 cursor-pointer"></span> 
              : 
              <div className="bg-green-400 rounded-full cursor-pointer">
                <img className="h-7 w-7" src="/check.svg" alt="completado"/>
              </div>
            }
            
            <p className={`pl-3 ` + (completed && 'line-through')}>
                {title}
            </p>
        </div>
        <img src="/delete.svg" alt="completado" className="h-7 w-7 cursor-pointer transition-all duration-300 ease-in"/>
    </div>
  );
}
