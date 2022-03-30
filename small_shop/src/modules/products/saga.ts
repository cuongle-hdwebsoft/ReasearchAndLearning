import { AxiosResponse } from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { fetchAuth } from "../../common/utils/fetch";
import { errorAction } from "../app/actions";
import { watchNotification } from "../app/saga";
import { createProductFail, createProductSuccess, loadProductsFail, loadProductsSuccess } from "./actions";
import {
  IProduct,
  CREATE_PRODUCT_ACTION,
  CREATE_PRODUCT_FAIL_ACTION,
  CREATE_PRODUCT_SUCCESS_ACTION,
  ICreateProductAction,
  LOAD_PRODUCT_FAIL,
  LOAD_PRODUCT_SUCCESS,
  LOAD_PRODUCTS,
} from "./constant";
import { loadProducts } from "./reducer";

export function* createProductSaga(action: ICreateProductAction) {
  try {
    const result: AxiosResponse<IProduct> = yield call(fetchAuth, "POST", "/products", action.payload);

    if (result && result.status === 201) {
      yield put(createProductSuccess());
      yield call(window.app.history, "/products");
    } else {
      yield put(createProductFail());
    }
  } catch (error) {
    yield put(errorAction({ type: "error", message: "Something wrong" }));
  }
}

export function* loadProductsSaga() {
  try {
    const result: AxiosResponse<IProduct[]> = yield call(fetchAuth, "GET", "/products", null, {
      params: {
        _limit: 10,
        _page: 1,
      },
    });

    if (result.status === 200) {
      yield put(loadProducts(result.data));
    } else {
      yield put(loadProductsFail());
    }
  } catch (error) {
    yield put(errorAction({ type: "error", message: "Something wrong" }));
  }
}

export function* watchProduct() {
  yield takeLatest(CREATE_PRODUCT_ACTION, createProductSaga);
  yield takeEvery(CREATE_PRODUCT_SUCCESS_ACTION, watchNotification);
  yield takeEvery(CREATE_PRODUCT_FAIL_ACTION, watchNotification);

  yield takeLatest(LOAD_PRODUCTS, loadProductsSaga);
  yield takeEvery(LOAD_PRODUCT_FAIL, watchNotification);
  yield takeEvery(LOAD_PRODUCT_SUCCESS, watchNotification);
}
