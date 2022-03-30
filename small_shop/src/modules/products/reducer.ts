import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, IReducerApp, MODULE_NAME } from "./constant";

const initialState: IReducerApp = {
  categories: [],
  productItem: null,
};

export const reducer = createSlice({
  name: MODULE_NAME,
  initialState,
  reducers: {
    createProduct: function (state, action: PayloadAction<IProduct>) {
      state.productItem = action.payload;
    },
  },
});

export const { createProduct } = reducer.actions;
