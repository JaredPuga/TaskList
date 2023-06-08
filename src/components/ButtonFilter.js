
export default function ButtonFilter({active, action, filter}) {
  return (
    <button className={`hover:text-white cursor-pointer transition-all duration-300 ease-in-out ` + (active.toLowerCase().includes(filter.toLowerCase()) ? 'text-blue-400' : 'text-gray-400')}>
        {filter}
    </button>
  )
}
