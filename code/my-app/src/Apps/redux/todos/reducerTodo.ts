import { ICourse } from "../../../fake-data/course";

interface ITodoReducer {
  courses: Array<ICourse>;
  choosenCourse: ICourse | null;
}

export const MODULE_TODO = "MODULE_TODO";

export const GET_COURSES = "GET_COURSES";
export const CHOOSE_COURSE_ID = "CHOOSE_COURSE_ID";

type IGetCourse = { type: typeof GET_COURSES; payload: Array<ICourse> };
type IChooseCourse = { type: typeof CHOOSE_COURSE_ID; payload: ICourse };
type IActionTodo = IGetCourse | IChooseCourse;

const initialState: ITodoReducer = {
  courses: [],
  choosenCourse: null,
};

function reducer(state = initialState, action: IActionTodo) {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case CHOOSE_COURSE_ID:
      return {
        ...state,
        choosenCourseId: action.payload,
      };

    default:
      return state;
  }
}

export default reducer;
