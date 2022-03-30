import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, IReducerApp, MODULE_NAME } from "./constant";

const initialState: IReducerApp = {
  categories: [],
  productItem: null,
  products: [],
};

export const reducer = createSlice({
  name: MODULE_NAME,
  initialState,
  reducers: {
    createProduct: function (state, action: PayloadAction<IProduct>) {
      state.productItem = action.payload;
    },
    loadProducts: function (state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
    },
  },
});

export const { createProduct, loadProducts } = reducer.actions;
