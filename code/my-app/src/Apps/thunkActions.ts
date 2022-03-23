import { AppDispatch } from "./redux";
import { CourseModel } from "../fake-data/course";
import { GET_COURSES } from "./redux/todos/reducerTodo";

export const GET_COURSES_ASYNC = "GET_COURSES_ASYNC";

export const getCourseAsync = (date: string) => {
  return async (dispatch: AppDispatch) => {
    console.log("time dispatch getCourseAsync", date);
    const rs = await CourseModel.getCourses();
    dispatch({ type: GET_COURSES, payload: rs });
  };
};
