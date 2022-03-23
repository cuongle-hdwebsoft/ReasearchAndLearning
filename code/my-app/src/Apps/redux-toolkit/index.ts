import { configureStore } from "@reduxjs/toolkit";
import reducerTodo, { MODULE_TODO } from "./todos/reducerTodo";

const store = configureStore({
  reducer: {
    [MODULE_TODO]: reducerTodo,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument: {
          rootAPI: "https://62384e090a54d2ceab73d950.mockapi.io/api/",
        },
      },
    });
  },
});

export default store;
