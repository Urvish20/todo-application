import { FiPlus } from "react-icons/fi";

export default function Header({ onAddClick }) {
  return (
    <header className="bg-cyan-700 shadow-lg">
      <div className="max-w-4xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Todo App</h1>
          <button
            onClick={onAddClick}
            className="flex cursor-pointer items-center gap-2 bg-white text-cyan-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-md hover:shadow-lg"
          >
            <FiPlus className="text-xl" />
            Add Task
          </button>
        </div>
      </div>
    </header>
  );
}
