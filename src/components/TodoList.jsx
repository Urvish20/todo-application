import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TodoItem from "./TodoItem";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../store/todoslice";

export default function TodoList({ items, setItems, onEdit }) {
  const dispatch = useDispatch();

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setItems(reorderedItems);
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-5 border-b pb-3">
        📝 Your Tasks
      </h2>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todoList">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`space-y-3 min-h-[120px] transition-all duration-300 ${
                snapshot.isDraggingOver ? "bg-blue-50 rounded-xl p-2" : ""
              }`}
            >
              {items.length === 0 && (
                <p className="text-gray-500 text-center py-10 text-lg font-medium">
                  No tasks yet. ✨ Click “Add Task” to get started!
                </p>
              )}

              {items?.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`transition-all duration-200 ${
                        snapshot.isDragging
                          ? "scale-[1.02] shadow-2xl rotate-[1deg]"
                          : ""
                      }`}
                    >
                      <TodoItem
                        item={item}
                        onDelete={handleDelete}
                        onEdit={onEdit}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
