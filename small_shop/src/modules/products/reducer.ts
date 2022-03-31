import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilterProduct, IProduct, IReducerApp, MODULE_NAME } from "./constant";

const initialState: IReducerApp = {
  categories: [],
  productItem: null,
  products: [],
  totalProducts: 0,
  page: 0,
  limit: 10,
  filter: {},
  isLoading: false,
};

export const reducer = createSlice({
  name: MODULE_NAME,
  initialState,
  reducers: {
    createProduct: function (state, action: PayloadAction<IProduct>) {
      state.productItem = action.payload;
    },
    loadProducts: function (
      state,
      action: PayloadAction<{
        products: IProduct[];
        totalProducts: number;
        page: number;
        limit: number;
        filter?: IFilterProduct;
      }>,
    ) {
      if (action.payload.products) {
        state.products = action.payload.products;
      }

      if (action.payload.totalProducts) {
        state.totalProducts = action.payload.totalProducts;
      }

      if (action.payload.page) {
        state.page = action.payload.page;
      }

      if (action.payload.limit) {
        state.limit = action.payload.limit;
      }

      if (action.payload.filter) {
        state.filter = action.payload.filter;
      }
    },
    loadFilters: function (state, action: PayloadAction<IFilterProduct>) {
      state.filter = action.payload;
    },
    setIsLoading: function (state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { createProduct, loadProducts, loadFilters, setIsLoading } = reducer.actions;
