import { INotificationAction } from "../app/constant";
import {
  CREATE_PRODUCT_ACTION,
  CREATE_PRODUCT_SUCCESS_ACTION,
  CREATE_PRODUCT_FAIL_ACTION,
  ICreateProductAction,
  IFormProduct,
  LOAD_PRODUCT_SUCCESS,
  IProduct,
  LOAD_PRODUCT_FAIL,
  LOAD_PRODUCTS,
} from "./constant";

export const createProduct = (product: IFormProduct): ICreateProductAction => {
  return {
    type: CREATE_PRODUCT_ACTION,
    payload: product,
  };
};

export const createProductSuccess = (): INotificationAction => {
  return {
    type: CREATE_PRODUCT_SUCCESS_ACTION,
    payload: {
      type: "success",
      message: "Create product successfully",
    },
  };
};

export const createProductFail = (): INotificationAction => {
  return {
    type: CREATE_PRODUCT_FAIL_ACTION,
    payload: {
      type: "error",
      message: "Create product fail",
    },
  };
};

export const loadProducts = () => {
  return {
    type: LOAD_PRODUCTS,
  };
};

export const loadProductsSuccess = (): INotificationAction => {
  return {
    type: LOAD_PRODUCT_SUCCESS,
    payload: {
      type: "success",
      message: "Load products successfully",
    },
  };
};

export const loadProductsFail = (): INotificationAction => {
  return {
    type: LOAD_PRODUCT_FAIL,
    payload: {
      type: "error",
      message: "Load products fail",
    },
  };
};
