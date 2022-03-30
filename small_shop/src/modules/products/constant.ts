export const MODULE_NAME = "APP_PRODUCT";

export const CREATE_PRODUCT_ACTION = "CREATE_PRODUCT_ACTION";
export const CREATE_PRODUCT_SUCCESS_ACTION = "CREATE_PRODUCT_SUCCESS_ACTION";
export const CREATE_PRODUCT_FAIL_ACTION = "CREATE_PRODUCT_FAIL_ACTION";

export const LOAD_PRODUCTS = "LOAD_PRODUCTS";
export const LOAD_PRODUCT_SUCCESS = "LOAD_PRODUCT_SUCCESS";
export const LOAD_PRODUCT_FAIL = "LOAD_PRODUCT_FAIL";

export interface ICategory {
  name: string;
  id: string;
  value: string;
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

export interface IFormProduct {
  productName: string;
  price: number;
  inStock: boolean;
  amount: number;
  categoryName: string;
  image: string;
}

export interface IReducerApp {
  categories: ICategory[];
  productItem: IProduct | null;
  products: IProduct[] | null;
}

export interface ICreateProductAction {
  type: string;
  payload: IFormProduct;
}
