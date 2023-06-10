
export default function ButtonFilter({action, active, filter}) {

  return (
    <button onClick={action} className={`hover:text-white cursor-pointer transition-all duration-300 ease-in-out font-bold ` + (active.toLowerCase().includes(filter.toLowerCase()) ? 'text-white' : 'text-gray-500')}>
        {filter}
    </button>
  )
}
