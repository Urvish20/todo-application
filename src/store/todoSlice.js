import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todoItems: [],
};

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todoItems.push(action.payload);
        },
        editTodo: (state, action) => {
            state.todoItems = state.todoItems.map((todo) =>
                todo.id === action.payload.id ? action.payload : todo
            );
        },
        deleteTodo: (state, action) => {
            state.todoItems = state.todoItems.filter((todo) => todo.id !== action.payload);
        },
        reorderTodos: (state, action) => {
            state.todoItems = action.payload;
        },
    },
});

export const { addTodo, editTodo, deleteTodo, reorderTodos } = todosSlice.actions;
export default todosSlice.reducer;