import { FiPlus, FiSearch } from "react-icons/fi";

export default function Header({
  onAddClick,
  onSearch,
  onTagFilter,
  selectedTag,
  todos = [],
}) {
  const uniqueTags = Array.from(
    new Set(
      todos
        .filter((todo) => todo && todo.tags && Array.isArray(todo.tags))
        .flatMap((todo) => todo.tags)
    )
  );

  return (
    <header className="bg-cyan-700 shadow-lg">
      <div className="max-w-4xl mx-auto px-6 py-5">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-white max-sm:hidden">
              Todo App
            </h1>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  onChange={(e) => onSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
                />
              </div>
            </div>
            <button
              onClick={onAddClick}
              className="flex cursor-pointer items-center gap-2 bg-white text-cyan-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-md hover:shadow-lg"
            >
              <FiPlus className="text-xl" />
              Add Task
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {uniqueTags.length > 0 && (
              <>
                <button
                  onClick={() => onTagFilter(null)}
                  className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                    !selectedTag
                      ? "bg-white text-cyan-700"
                      : "bg-cyan-600 text-white"
                  }`}
                >
                  All
                </button>
                {uniqueTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => onTagFilter(tag)}
                    className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                      selectedTag === tag
                        ? "bg-white text-cyan-700"
                        : "bg-cyan-600 text-white"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
