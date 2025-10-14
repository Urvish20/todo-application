import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todoslice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, todosReducer);

export const store = configureStore({
    reducer: {
        todos: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types for serialization check
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/REGISTER'
                ],
            },
        }),
});

export const persistor = persistStore(store);