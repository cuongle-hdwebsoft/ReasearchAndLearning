import { all } from "redux-saga/effects";
import { watchProduct } from "./products/saga";

export default function* rootSaga() {
  yield all([watchProduct()]);
}
