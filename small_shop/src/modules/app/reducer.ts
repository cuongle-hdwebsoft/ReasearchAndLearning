import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitActionPayload, IReducerApp, IToastAction, MODULE_NAME, IHistoryAction } from "./constant";

const initialState: IReducerApp = {
  isRunning: false,
  toast: null,
  history: null,
};

export const reducer = createSlice({
  name: MODULE_NAME,
  initialState,
  reducers: {
    init(state, action: PayloadAction<IInitActionPayload>) {
      state.isRunning = action.payload.isRunning;
    },
    setToast: function (state, action: PayloadAction<IToastAction>) {
      state.toast = action.payload;
    },
    setHistory: function (state, action: PayloadAction<IHistoryAction>) {
      state.history = action.payload;
    },
  },
});

export const { setToast, setHistory } = reducer.actions;
