import { CourseModel } from "../../../fake-data/course";
import { AppDispatch } from "../../redux";
import { GET_COURSES } from "../../redux/todos/reducerTodo";

export const GET_COURSES_ASYNC = "GET_COURSES_ASYNC";

export const getCourseAsync = (date: string) => {
  return async (dispatch: AppDispatch) => {
    console.log("time dispatch ", date);
    const rs = await CourseModel.getCourses();
    dispatch({ type: GET_COURSES, payload: rs });
  };
};
