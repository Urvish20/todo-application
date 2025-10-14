import { FiTrash2 } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";

export default function TodoItem({ item, onDelete, onEdit }) {
  return (
    <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition">
      <div>
        <h3 className="font-semibold text-gray-800">{item.title}</h3>
        {item.description && (
          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
        )}
      </div>
      <div className="flex items-center space-x-3">
        <button
          className="ml-2 px-3 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition cursor-pointer"
          onClick={() => onEdit(item)}
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="text-red-500 hover:text-red-600 transition-colors cursor-pointer"
        >
          <FiTrash2 className="text-xl" />
        </button>
      </div>
    </div>
  );
}
