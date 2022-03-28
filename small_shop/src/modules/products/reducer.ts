import { createSlice } from "@reduxjs/toolkit";
import { IReducerApp, MODULE_NAME } from "./constant";

const initialState: IReducerApp = {
  categories: [],
};

export const reducer = createSlice({
  name: MODULE_NAME,
  initialState,
  reducers: {},
});
