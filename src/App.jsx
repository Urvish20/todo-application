import { useState } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import "./App.css";
import Modal from "./components/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onAddClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSaveTodo = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onAddClick={onAddClick} />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <TodoList />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveTodo}
        editTodo={null}
      />
    </div>
  );
}

export default App;
