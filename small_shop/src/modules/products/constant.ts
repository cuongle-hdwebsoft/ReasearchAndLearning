export const MODULE_NAME = "APP_PRODUCT";

export interface ICategory {
  name: string;
  id: string;
  image: string;
  createdAt: string;
  createdBy: string;
}

export interface IReducerApp {
  categories: ICategory[];
}
