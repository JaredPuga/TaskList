export default function NoTasks({ text }) {
  return (
    <div className="flex justify-center text-bold md:text-5xl m-5 md:flex-col items-center">
      <img src="/no_task.png" alt="no task icon" className="w-44" />
      <h1 className="font-bold">{text}</h1>
    </div>
  );
}
