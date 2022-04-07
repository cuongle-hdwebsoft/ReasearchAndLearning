export const MODULE_NAME = "APP_PRODUCT";

export const CREATE_PRODUCT_ACTION = "CREATE_PRODUCT_ACTION";
export const CREATE_PRODUCT_SUCCESS_ACTION = "CREATE_PRODUCT_SUCCESS_ACTION";
export const CREATE_PRODUCT_FAIL_ACTION = "CREATE_PRODUCT_FAIL_ACTION";

export const LOAD_PRODUCTS = "LOAD_PRODUCTS";
export const LOAD_PRODUCT_SUCCESS = "LOAD_PRODUCT_SUCCESS";
export const LOAD_PRODUCT_FAIL = "LOAD_PRODUCT_FAIL";

export const EDIT_PRODUCT_ACTION = "EDIT_PRODUCT_ACTION";
export const EDIT_PRODUCT_SUCCESS_ACTION = "EDIT_PRODUCT_SUCCESS_ACTION";
export const EDIT_PRODUCT_FAIL_ACTION = "EDIT_PRODUCT_FAIL_ACTION";

export const DELETE_PRODUCT_ACTION = "DELETE_PRODUCT_ACTION";
export const DELETE_PRODUCT_SUCCESS_ACTION = "DELETE_PRODUCT_SUCCESS_ACTION";
export const DELETE_PRODUCT_FAIL_ACTION = "DELETE_PRODUCT_FAIL_ACTION";

export interface ICategory {
  name?: string;
  id?: string;
  value?: string;
}

export interface IProduct {
  id: string | number;
  productName: string;
  price: number;
  inStock: boolean;
  amount: number;
  categoryName: string;
  imageUrl: string;
  isActive: boolean;
}

export type IFormProduct = Omit<IProduct, "id">;
export interface IReducerApp {
  categories: ICategory[];
  productItem: IProduct | null;
  products: IProduct[] | null;
  totalProducts: number;
  page: number;
  limit: number;
  isLoading: boolean;
  filter?: IFilterProduct;
  isDeleting: boolean;
}

export interface ICreateProductAction {
  type: string;
  payload: IFormProduct;
}

export interface IEditProductAction {
  type: string;
  payload: IFormProduct & { id: string | number };
}

export interface ILoadProductAction {
  type: string;
  payload: ILoadProductParams;
}

export interface IDeleteProductAction {
  type: string;
  payload: {
    idProduct: string;
  };
}

export interface IBaseFilter<T> {
  page?: number;
  limit?: number;
  filter?: T;
  [key: string]: number | string | T | undefined;
}

export interface IBaseLoad<T> {
  page?: number;
  limit?: number;
  filter?: T;
  params?: IParams;
  url?: string;
  [key: string]: number | string | T | IParams | undefined;
}

export interface IFilterProduct {
  productName?: string;
  inStock?: boolean;
  categoryName?: string;
  [key: string]: string | number | unknown;
}

export interface IFitlerCategory {
  name?: string;
  [key: string]: string | number | unknown;
}

export type ILoadProductParams = IBaseLoad<IFilterProduct>;
export type IParams = { _limit: number; _page: number } & { [key: string]: string | number | unknown };
