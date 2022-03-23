import { Col, Row } from "antd";
import { useHistory } from "react-router-dom";
import { courses, ICourse } from "../fake-data/course";

export default function ParamsPage() {
  const history = useHistory();

  const handleDetailCourse = (course: ICourse) => {
    history.push(`/course/${course.id}`);
  };

  const renderList = () => {
    const c = courses.map((course) => {
      return (
        <Col key={course.id} lg={6}>
          <div className="course" onClick={() => handleDetailCourse(course)}>
            <img className="course__img" src={course.image} alt="" />
            <div className="course__name">{course.name}</div>
          </div>
        </Col>
      );
    });

    return <Row gutter={6}>{c}</Row>;
  };

  return (
    <div>
      <h1>Courses 2022</h1>
      <div>{renderList()}</div>
    </div>
  );
}
