import { INotificationAction } from "../app/constant";
import {
  CREATE_PRODUCT_ACTION,
  CREATE_PRODUCT_SUCCESS_ACTION,
  CREATE_PRODUCT_FAIL_ACTION,
  ICreateProductAction,
  IFormProduct,
  LOAD_PRODUCT_SUCCESS,
  LOAD_PRODUCT_FAIL,
  LOAD_PRODUCTS,
  ILoadProductParams,
  IEditProductAction,
  EDIT_PRODUCT_ACTION,
  EDIT_PRODUCT_SUCCESS_ACTION,
  EDIT_PRODUCT_FAIL_ACTION,
  DELETE_PRODUCT_ACTION,
  IDeleteProductAction,
  DELETE_PRODUCT_SUCCESS_ACTION,
  DELETE_PRODUCT_FAIL_ACTION,
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

export const loadProducts = (params: ILoadProductParams) => {
  return {
    type: LOAD_PRODUCTS,
    payload: params,
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

export const editProduct = (product: IFormProduct & { id: string | number }): IEditProductAction => {
  return {
    type: EDIT_PRODUCT_ACTION,
    payload: product,
  };
};

export const editProductSuccess = (): INotificationAction => {
  return {
    type: EDIT_PRODUCT_SUCCESS_ACTION,
    payload: {
      type: "success",
      message: "Edit product successfully",
    },
  };
};

export const editProductFail = (): INotificationAction => {
  return {
    type: EDIT_PRODUCT_FAIL_ACTION,
    payload: {
      type: "error",
      message: "Edit product fail",
    },
  };
};

export const deleteProduct = (idProduct: string): IDeleteProductAction => {
  return {
    type: DELETE_PRODUCT_ACTION,
    payload: {
      idProduct,
    },
  };
};

export const deleteProductSuccess = (): INotificationAction => {
  return {
    type: DELETE_PRODUCT_SUCCESS_ACTION,
    payload: {
      type: "success",
      message: "Create product successfully",
    },
  };
};

export const deleteProductFail = (): INotificationAction => {
  return {
    type: DELETE_PRODUCT_FAIL_ACTION,
    payload: {
      type: "error",
      message: "Create product fail",
    },
  };
};
