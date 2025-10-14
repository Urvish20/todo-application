import { useState } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import "./App.css";
import Modal from "./components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, editTodo, reorderTodos } from "./store/todoslice";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodoItem, setEditTodoItem] = useState(null);
  const todos = useSelector((state) => state.todos.todoItems);
  console.log("todos: ", todos);
  const dispatch = useDispatch();

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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onAddClick={onAddClick} />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <TodoList
          items={todos}
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
