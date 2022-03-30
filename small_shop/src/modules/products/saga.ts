import { takeEvery, takeLatest } from "redux-saga/effects";

export function* createProduct() {
  try {
  } catch (error) {}
}

export function* watchProduct() {
  yield takeLatest("CREATE_PRODUCT_SAGA", createProduct);
}
