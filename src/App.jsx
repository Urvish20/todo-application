import { useState } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import "./App.css";
import Modal from "./components/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  const onAddClick = () => {
    setEditTodo(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditTodo(null);
  };

  const handleSaveTodo = (todo) => {
    setItems((prevItems) => [...prevItems, todo]);
    setIsModalOpen(false);
  };

  const handleEditClick = (todo) => {
    setEditTodo(todo);
    setIsModalOpen(true);
  };

  const handleEditSave = (updatedTodo) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedTodo.id ? updatedTodo : item))
    );
    setIsModalOpen(false);
    setEditTodo(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onAddClick={onAddClick} />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <TodoList items={items} setItems={setItems} onEdit={handleEditClick} />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={editTodo ? handleEditSave : handleSaveTodo}
        editTodo={editTodo}
      />
    </div>
  );
}

export default App;
