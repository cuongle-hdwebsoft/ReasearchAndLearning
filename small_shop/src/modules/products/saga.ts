import { AxiosResponse } from "axios";
import { all, call, delay, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { fetchAuth } from "../../common/utils/fetch";
import { errorActionSaga, historyActionSaga } from "../app/actions";
import { watchNotification } from "../app/saga";
import {
  createProductFailActionSaga,
  createProductSuccessActionSaga,
  deleteProductFailActionSaga,
  deleteProductSuccessActionSaga,
  editProductFailActionSaga,
  editProductSuccessActionSaga,
  loadProductsFailActionSaga,
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
  DELETE_PRODUCT_ACTION,
  DELETE_PRODUCT_SUCCESS_ACTION,
  DELETE_PRODUCT_FAIL_ACTION,
  IDeleteProductAction,
} from "./constant";
import { loadFilters, loadProducts, setIsLoading } from "./reducer";
import { loadProductsActionSaga } from "./actions";
import { RootState } from "../hook";
import formatData from "../../common/utils/formatData";
import ProductApi from "../../apis/services/products";

export function* createProductSaga(action: ICreateProductAction) {
  try {
    const { error } = yield call(ProductApi.create, action.payload);

    if (!error) {
      yield put(createProductSuccessActionSaga());
      yield put(historyActionSaga("/products"));
    } else {
      yield put(createProductFailActionSaga());
    }
  } catch (error) {
    yield put(errorActionSaga({ type: "error", message: "Something wrong" }));
  }
}

export function* editProductSaga(action: IEditProductAction) {
  try {
    const { error } = yield call(ProductApi.edit, action.payload);

    if (!error) {
      yield put(editProductSuccessActionSaga());
      yield put(historyActionSaga("/products"));
    } else {
      yield put(editProductFailActionSaga());
    }
  } catch (error) {
    yield put(errorActionSaga({ type: "error", message: "Something wrong" }));
  }
}

export function* deleteProductSaga(action: IDeleteProductAction) {
  try {
    const { error } = yield call(ProductApi.delete, action.payload.idProduct);

    if (!error) {
      yield all([put(deleteProductSuccessActionSaga()), put(loadProductsActionSaga({}))]);
    } else {
      yield put(deleteProductFailActionSaga());
    }
  } catch (error) {
    yield put(errorActionSaga({ type: "error", message: "Something wrong" }));
  }
}

export function* loadProductsSaga(action: ILoadProductAction) {
  try {
    const reducerProduct: IReducerApp = yield select((state: RootState) => state.APP_PRODUCT);
    const { page, limit, filter, params, url } = formatData<IFilterProduct>(
      {
        limit: reducerProduct.limit,
        page: reducerProduct.page,
        filter: reducerProduct.filter,
      },
      {
        limit: action.payload.limit,
        page: action.payload.page,
        filter: action.payload.filter,
      },
    );

    yield put(setIsLoading(true));
    yield put(loadFilters(filter));
    window.history.replaceState(null, "", "/products?".concat(url));
    yield delay(500);

    const { data, totalProducts, error } = yield call(ProductApi.getAll, params);
    if (error) {
      yield put(loadProductsFailActionSaga());
    } else {
      yield put(
        loadProducts({
          products: data,
          totalProducts,
          limit: limit,
          page: page,
        }),
      );
    }
    yield put(setIsLoading(false));
  } catch (error) {
    yield put(errorActionSaga({ type: "error", message: "Something wrong" }));
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

  yield takeLatest(DELETE_PRODUCT_ACTION, deleteProductSaga);
  yield takeEvery(DELETE_PRODUCT_SUCCESS_ACTION, watchNotification);
  yield takeEvery(DELETE_PRODUCT_FAIL_ACTION, watchNotification);
}
