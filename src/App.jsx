import { useState, useEffect } from "react";
import { Add, Complete, Remove, Sad } from "./icons";

function App() {
  const [tasks, setTasks] = useState([]);
  const [aTask, setATask] = useState("");

  useEffect(() => {
    console.log("Tasks changed:", tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    console.log("Stored tasks:", storedTasks);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const addTask = (task) => {
    setTasks([
      ...tasks,
      { task: task, id: tasks.length + 1, completed: false },
    ]);
    setATask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => id !== task.id));
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((tsk) =>
        tsk.id === id ? { ...tsk, completed: !tsk.completed } : tsk
      )
    );
  };

  return (
    <div className="flex items-center flex-col min-h-screen bg-gradient-to-t from-neutral-900 via-slate-900 to-zinc-900 text-gray-200">
      <h1 className="py-4 text-4xl font-black mb-8 mt-8 bg-white text-black px-32 text-center ">
        Tasks To Do
      </h1>
      <div className="w-full max-w-3xl items-center flex justify-between mb-8 border-4">
        <input
          value={aTask}
          type="text"
          className=" mr-4 w-full px-2 bg-transparent outline-none "
          onChange={(e) => setATask(e.target.value)}
        />
        <button onClick={() => addTask(aTask)}>
          <Add />
        </button>
      </div>
      {tasks.length === 0 ? (
        <div className="mt-14 flex flex-col items-center justify-center gap-8">
          <Sad />
          <p className="text-5xl">NO TODOS TO DISPLAY</p>
        </div>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between my-6 pb-2 w-full max-w-2xl text-xl border-b-2"
          >
            <h1 className={task.completed ? "line-through" : ""}>
              {task.task}
            </h1>
            <div className="flex items-center gap-4 ">
              <button
                className="text-red-500"
                onClick={() => deleteTask(task.id)}
              >
                <Remove />
              </button>
              <button
                className="text-green-500"
                onClick={() => completeTask(task.id)}
              >
                <Complete />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
