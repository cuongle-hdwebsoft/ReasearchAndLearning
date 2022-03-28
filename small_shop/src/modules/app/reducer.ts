import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitActionPayload, IReducerApp, MODULE_NAME } from "./constant";

const initialState: IReducerApp = {
  isRunning: false,
};

export const reducer = createSlice({
  name: MODULE_NAME,
  initialState,
  reducers: {
    init(state, action: PayloadAction<IInitActionPayload>) {
      state.isRunning = action.payload.isRunning;
    },
  },
});
