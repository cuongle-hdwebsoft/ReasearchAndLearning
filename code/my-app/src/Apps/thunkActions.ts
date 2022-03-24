import { AppDispatch, RootState } from "./redux";
import { CourseModel } from "../fake-data/course";
import { GET_COURSES } from "./redux/todos/reducerTodo";

export const GET_COURSES_ASYNC = "GET_COURSES_ASYNC";

export const getCourseAsync = (date: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState, extraArgs: { rootAPI: string }) => {
    console.log("time dispatch getCourseAsync", date, extraArgs);
    const rs = await CourseModel.getCourses();
    dispatch({ type: GET_COURSES, payload: rs });
  };
};
