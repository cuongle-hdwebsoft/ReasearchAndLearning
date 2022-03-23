import { combineReducers, createStore, applyMiddleware } from "redux";
import reducerTodo, { MODULE_TODO } from "./todos/reducerTodo";
import reducerUser, { MODULE_USER } from "./users/reducerUser";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  [MODULE_TODO]: reducerTodo,
  [MODULE_USER]: reducerUser,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk.withExtraArgument({
        rootAPI: "https://62384e090a54d2ceab73d950.mockapi.io/api/",
      }),
    ),
  ),
);

export default store;
