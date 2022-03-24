import { ICourse } from "../../../fake-data/course";

interface ITodoReducer {
  courses: Array<ICourse>;
  choosenCourse: ICourse | null;
  countTakeEvery: number;
  countTakeLatest: number;
}

export const MODULE_TODO = "MODULE_TODO";

export const GET_COURSES = "GET_COURSES";
export const CHOOSE_COURSE_ID = "CHOOSE_COURSE_ID";
export const CLICK_BUTTON_TAKE_EVERY = "CLICK_BUTTON_TAKE_EVERY";
export const CLICK_BUTTON_TAKE_LATEST = "CLICK_BUTTON_TAKE_LATEST";

type IGetCourse = { type: typeof GET_COURSES; payload: Array<ICourse> };
type IChooseCourse = { type: typeof CHOOSE_COURSE_ID; payload: ICourse };
type IClickButtonTakeEvery = { type: typeof CLICK_BUTTON_TAKE_EVERY; payload: number };
type IClickButtonTakeLatest = { type: typeof CLICK_BUTTON_TAKE_LATEST; payload: number };
type IActionTodo = IGetCourse | IChooseCourse | IClickButtonTakeEvery | IClickButtonTakeLatest;

const initialState: ITodoReducer = {
  courses: [],
  choosenCourse: null,
  countTakeEvery: 0, // saga
  countTakeLatest: 0, // saga
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
    case CLICK_BUTTON_TAKE_EVERY:
      return {
        ...state,
        countTakeEvery: state.countTakeEvery + 1,
      };
    case CLICK_BUTTON_TAKE_LATEST:
      return {
        ...state,
        countTakeLatest: state.countTakeLatest + 1,
      };
    default:
      return state;
  }
}

export default reducer;
