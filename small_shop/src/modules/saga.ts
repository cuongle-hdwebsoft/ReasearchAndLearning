import { all } from "redux-saga/effects";
import { watchApp } from "./app/saga";
import { watchProduct } from "./products/saga";

export default function* rootSaga() {
  yield all([watchProduct(), watchApp()]);
}
