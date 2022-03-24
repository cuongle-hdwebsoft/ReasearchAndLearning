import { configureStore } from "@reduxjs/toolkit";
import reducerTodo, { MODULE_TODO } from "./todos/reducerTodo";

import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/saga";
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    [MODULE_TODO]: reducerTodo,
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      thunk: {
        extraArgument: {
          rootAPI: "https://62384e090a54d2ceab73d950.mockapi.io/api/",
        },
      },
    }).concat(sagaMiddleware);

    return middleware;
  },
});

console.log("using store redux-toolkit");

sagaMiddleware.run(rootSaga);

export default store;
