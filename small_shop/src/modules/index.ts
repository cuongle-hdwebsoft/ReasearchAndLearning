import { configureStore } from "@reduxjs/toolkit";
import { MODULE_NAME as MODULE_APP } from "./app/constant";
import { reducer as reducerApp } from "./app/reducer";

import { MODULE_NAME as MODULE_PRODUCT } from "./products/constant";
import { reducer as reducerProduct } from "./products/reducer";

import saga from "./saga";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    [MODULE_APP]: reducerApp.reducer,
    [MODULE_PRODUCT]: reducerProduct.reducer,
  },
  middleware: [sagaMiddleware],
});

export const { dispatch, getState, subscribe, replaceReducer } = store;

sagaMiddleware.run(saga);
