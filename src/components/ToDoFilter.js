import ButtonFilter from "./ButtonFilter";

export default function ToDoFilter({count = 0}) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-700 border-b border-solid border-gray-600">
        <p className="text-gray-400 text-sm">{count} task(s)</p>
        <div className="flex items-center space-x-5">
            <ButtonFilter action={() => {}} active='All' filter='All'/>
            <ButtonFilter action={() => {}} active='All' filter='To do'/>
            <ButtonFilter action={() => {}} active='All' filter='Completed'/>
        </div>
        <button className="text-gray-400 hover:text-white cursor-pointer transition-all duration-300 ease-in">
            Clear Completed
        </button>
        </div>
  )
}
