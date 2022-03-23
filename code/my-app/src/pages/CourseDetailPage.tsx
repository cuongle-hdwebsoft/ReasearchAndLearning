import { Button } from "antd";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { courses, ICourse } from "../fake-data/course";

export default function CourseDetailPage() {
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const [course, setCourse] = useState<ICourse>();

  useEffect(() => {
    const course = courses.find((course) => {
      return course.id === parseInt(params.id);
    });

    setCourse(course);
  }, [params.id]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Course Detail {course?.name}</h1>
      <img style={{ width: "100%", height: 500 }} src={course?.image} alt="" />
      <p>{course?.describe}</p>
      <Button onClick={() => history.goBack()} type="link">
        Back
      </Button>
    </div>
  );
}
