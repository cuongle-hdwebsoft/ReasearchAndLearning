export const MODULE_NAME = "APP_PRODUCT";

export interface ICategory {
  name: string;
  id: string;
  image: string;
  createdAt: string;
  createdBy: string;
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

export interface IReducerApp {
  categories: ICategory[];
  productItem: IProduct | null;
}
