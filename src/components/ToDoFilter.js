import { useTask } from "../hooks/useTask";
import Swal from "sweetalert2";
import ButtonFilter from "./ButtonFilter";

export default function ToDoFilter({ count = 0 }) {
  const {
    activeFilter,
    showAllTasks,
    showToDoTask,
    showCompletedTask,
    handleDeleteCompleteTask,
  } = useTask();

  return (
    <div className="flex items-center justify-between p-4 bg-gray-700 border-b border-solid border-gray-600">
      <p className="text-gray-400 text-sm">{count} task(s)</p>
      <div className="flex items-center space-x-5">
        <ButtonFilter
          action={() => showAllTasks()}
          active={activeFilter}
          filter="All"
        />
        <ButtonFilter
          action={() => showToDoTask()}
          active={activeFilter}
          filter="To do"
        />
        <ButtonFilter
          action={() => showCompletedTask()}
          active={activeFilter}
          filter="Completed"
        />
      </div>
      <button
        className="text-red-500 font-bold hover:text-red-600 cursor-pointer"
        onClick={() => {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              handleDeleteCompleteTask();
              Swal.fire("Deleted!", "All tasks has been deleted.", "success");
            }
          });
        }}
      >
        Clear All
      </button>
    </div>
  );
}
