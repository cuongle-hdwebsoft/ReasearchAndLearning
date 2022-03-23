import { configureStore } from "@reduxjs/toolkit";
import reducerTodo, { MODULE_TODO } from "./todos/reducerTodo";

import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    [MODULE_TODO]: reducerTodo,
  },
  middleware: [thunk],
});

export default store;
