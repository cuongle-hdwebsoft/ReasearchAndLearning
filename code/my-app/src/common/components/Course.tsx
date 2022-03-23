import { Col } from "antd";
import { ICourse } from "../../fake-data/course";

interface IProps {
  course: ICourse;
}

export default function Course(props: IProps) {
  const { course } = props;

  return (
    <Col key={course.id} lg={6}>
      <div className="course">
        <img className="course__img" src={course.image} alt="" />
        <div className="course__name">{course.name}</div>
      </div>
    </Col>
  );
}
