import { useState } from "react";

function App() {
  /// State para Gerenciar Tasks
  const [tasks, setTasks] = useState([
    { id: 1, title: "Estudar React", done: false },
    { id: 2, title: "Estudar SpringBoot", done: false },
    { id: 3, title: "Estudar FastAPI", done: false },
  ]);

  /// State para criar nova Task
  const [newTaskTitle, setNewTaskTitle] = useState("");

  /// Mudar Task para Done ou !Done
  function toggleTask(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  /// Função para criar nova Task
  function handleAddTask() {
    if (newTaskTitle.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      done: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  }

  /// Função para deletar Task
  function handleDeleteTask(id) {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }

  return (
    <div className="w-screen h-screen bg-slate-700 flex justify-center p-8">
      <div className="w-[500px] space-y-4">
        <h1 className="text-2xl font-bold text-white text-center">
          LISTA DE TAREFAS
        </h1>

        {/* INPUT + BOTÃO */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Digite uma nova tarefa..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="bg-slate-900 flex-1 p-2 rounded-md"
          />

          <button
            onClick={handleAddTask}
            className="bg-green-600 text-white px-4 rounded-md cursor-pointer"
          >
            Adicionar
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`flex justify-between items-center w-full text-white p-3 rounded-md cursor-pointer ${
                task.done
                  ? "bg-slate-500 line-through"
                  : "bg-slate-800 text-white"
              }`}
            >
              <span
                onClick={() => toggleTask(task.id)}
                className="cursor-pointer"
              ></span>
              {task.title}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTask(task.id);
                }}
                className="x- bg-red-600 px-4 mx-3 py-1 rounded-md ml-2 cursor-pointer"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
