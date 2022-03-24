import { createAction, createSlice } from "@reduxjs/toolkit";
import { ICourse } from "../../../fake-data/course";

interface ITodoState {
  courses: Array<ICourse>;
  choosenCourse: ICourse | null;
  countTakeEvery: number;
  countTakeLatest: number;
}

export const MODULE_TODO = "MODULE_TODO";
const initialState: ITodoState = {
  courses: [],
  choosenCourse: null,
  countTakeEvery: 0, // saga
  countTakeLatest: 0, // saga
};

export const getCourses = createAction<ICourse[]>("GET_COURSES");

const reducerTodo = createSlice({
  name: MODULE_TODO,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCourses, function (state, action) {
      state.courses = action.payload;
    });
  },
});

export default reducerTodo.reducer;
