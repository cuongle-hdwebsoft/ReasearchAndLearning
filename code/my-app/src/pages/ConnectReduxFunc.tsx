import { Row } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Course from "../common/components/Course";
import { CourseModel } from "../fake-data/course";
import { useAppSelector } from "../common/hooks";

// action toolkit
import { getCourses } from "../Apps/redux-toolkit/todos/reducerTodo";

// action redux
import { GET_COURSES } from "../Apps/redux/todos/reducerTodo";

// thunk action
import { getCourseAsync } from "../Apps/thunkActions";

export default function ConnectReduxFunc() {
  const courses = useAppSelector((state) => state.MODULE_TODO.courses);
  const dispatch = useDispatch();

  // for redux
  useEffect(() => {
    const getData = async () => {
      const rs = await CourseModel.getCourses();
      dispatch({
        type: GET_COURSES,
        payload: rs,
      });
      // console.log(getCourses(rs));
      // dispatch(getCourses(rs));
    };
    getData();
  }, [dispatch]);

  // for redux thunk
  // useEffect(() => {
  //   dispatch(getCourseAsync(new Date().toISOString()));
  // }, []);

  const renderListCourses = () => {
    return courses.map((course) => {
      return <Course key={course.id} course={course} />;
    });
  };

  return (
    <div>
      <h1>Connect Redux with functional</h1>
      <Row>{renderListCourses()}</Row>
    </div>
  );
}
