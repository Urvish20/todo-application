import { useState, useEffect } from "react";

export default function Modal({ isOpen, onClose, onSave, editTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title);
      setDescription(editTodo.description || "");
      setTags(editTodo.tags || []);
    } else {
      setTitle("");
      setDescription("");
      setTags([]);
    }
  }, [editTodo, isOpen]);

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (title.trim()) {
      const todoData = {
        id: editTodo ? editTodo.id : Date.now(),
        title: title.trim(),
        description: description.trim(),
        tags,
        completed: editTodo ? editTodo.completed : false,
      };
      onSave(todoData);
      setTitle("");
      setDescription("");
      setTags([]);
      onClose();
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setTags([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {editTodo ? "Edit Task" : "Add New Task"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-4 sm:p-6 flex flex-col gap-2">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg "
              autoFocus
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description (optional)"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <form onSubmit={handleAddTag} className="flex gap-1 sm:gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag..."
                className="flex-1 px-2 sm:px-4 py-2 border border-gray-300 rounded-lg"
              />
              <button
                type="submit"
                className="px-2 cursor-pointer sm:px-4 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800"
              >
                Add
              </button>
            </form>
          </div>

          <div className="flex gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 cursor-pointer py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2 cursor-pointer text-white rounded-lg bg-cyan-700 transition-colors font-medium"
            >
              {editTodo ? "Edit Task" : "Add Task"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
