import { AxiosResponse } from "axios";
import { call, delay, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { fetchAuth } from "../../common/utils/fetch";
import { errorAction } from "../app/actions";
import { watchNotification } from "../app/saga";
import {
  createProductFail,
  createProductSuccess,
  editProductFail,
  editProductSuccess,
  loadProductsFail,
} from "./actions";
import {
  IProduct,
  CREATE_PRODUCT_ACTION,
  CREATE_PRODUCT_FAIL_ACTION,
  CREATE_PRODUCT_SUCCESS_ACTION,
  ICreateProductAction,
  LOAD_PRODUCT_FAIL,
  LOAD_PRODUCT_SUCCESS,
  LOAD_PRODUCTS,
  ILoadProductAction,
  IReducerApp,
  IFilterProduct,
  EDIT_PRODUCT_ACTION,
  EDIT_PRODUCT_SUCCESS_ACTION,
  EDIT_PRODUCT_FAIL_ACTION,
  IEditProductAction,
} from "./constant";
import { loadFilters, loadProducts, setIsLoading } from "./reducer";
import queryString from "query-string";
import { RootState } from "../hook";

export function* createProductSaga(action: ICreateProductAction) {
  try {
    const result: AxiosResponse<IProduct> = yield call(fetchAuth, "POST", "/products", action.payload);

    if (result && result.status === 201) {
      yield put(createProductSuccess());
      yield call(window.app.history.push, "/products");
    } else {
      yield put(createProductFail());
    }
  } catch (error) {
    yield put(errorAction({ type: "error", message: "Something wrong" }));
  }
}

export function* editProductSaga(action: IEditProductAction) {
  try {
    const result: AxiosResponse<IProduct> = yield call(
      fetchAuth,
      "PUT",
      "/products/" + action.payload.id,
      action.payload,
    );

    if (result && result.status === 200) {
      yield put(editProductSuccess());
      yield call(window.app.history.push, "/products");
    } else {
      yield put(editProductFail());
    }
  } catch (error) {
    yield put(errorAction({ type: "error", message: "Something wrong" }));
  }
}

export function* loadProductsSaga(action: ILoadProductAction) {
  try {
    let page = typeof action.payload.page === "string" ? parseInt(action.payload.page) : action.payload.page;
    let limit = typeof action.payload.limit === "string" ? parseInt(action.payload.limit) : action.payload.limit;
    const reducerProduct: IReducerApp = yield select((state: RootState) => state.APP_PRODUCT);

    page = page || 0;
    limit = limit || reducerProduct.limit || 10;

    const params: IFilterProduct & { _limit?: number; _page?: number } = {
      ...reducerProduct.filter,
      _limit: limit,
      _page: page + 1,
    };

    if (action.payload.productName) {
      params.productName = action.payload.productName;
    }

    if (action.payload.productName === "") {
      delete params.productName;
    }

    if (action.payload.categoryName) {
      params.categoryName = action.payload.categoryName;
    }

    if (action.payload.categoryName === "") {
      delete params.categoryName;
    }

    yield put(setIsLoading(true));
    yield put(loadFilters({ productName: params.productName, categoryName: params.categoryName }));
    yield delay(500);

    const result: AxiosResponse<IProduct[]> = yield call(fetchAuth, "GET", "/products", null, {
      params: params,
    });

    if (result.status === 200) {
      const totalProducts = parseInt(result.headers["x-total-count"]);

      yield put(
        loadProducts({
          products: result.data,
          totalProducts,
          limit: limit,
          page: page,
        }),
      );

      delete params._limit;
      delete params._page;

      window.history.replaceState(
        null,
        "",
        "/products?".concat(
          queryString.stringify({
            ...params,
            limit: limit,
            page: page,
          }),
        ),
      );
    } else {
      yield put(loadProductsFail());
    }

    yield put(setIsLoading(false));
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

  yield takeLatest(EDIT_PRODUCT_ACTION, editProductSaga);
  yield takeEvery(EDIT_PRODUCT_SUCCESS_ACTION, watchNotification);
  yield takeEvery(EDIT_PRODUCT_FAIL_ACTION, watchNotification);
}
