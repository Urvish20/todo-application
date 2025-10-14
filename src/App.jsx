import { useState, useMemo } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import "./App.css";
import Modal from "./components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, editTodo, reorderTodos } from "./store/todoslice";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodoItem, setEditTodoItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const todos = useSelector((state) => state.todos.todoItems);
  console.log("todos: ", todos);
  const dispatch = useDispatch();

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        todo.title.toLowerCase().includes(searchTerm) ||
        (todo.description &&
          todo.description.toLowerCase().includes(searchTerm))
      );
    });
  }, [todos, searchQuery]);

  const onAddClick = () => {
    setEditTodoItem(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditTodoItem(null);
  };

  const handleSaveTodo = (todo) => {
    dispatch(addTodo(todo));
    setIsModalOpen(false);
  };

  const handleEditClick = (todo) => {
    setEditTodoItem(todo);
    setIsModalOpen(true);
  };

  const handleEditSave = (updatedTodo) => {
    dispatch(editTodo(updatedTodo));
    setIsModalOpen(false);
    setEditTodoItem(null);
  };

  const handleReorder = (newOrder) => {
    dispatch(reorderTodos(newOrder));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onAddClick={onAddClick} onSearch={handleSearch} />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <TodoList
          items={filteredTodos}
          setItems={handleReorder}
          onEdit={handleEditClick}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={editTodoItem ? handleEditSave : handleSaveTodo}
        editTodo={editTodoItem}
      />
    </div>
  );
}

export default App;
