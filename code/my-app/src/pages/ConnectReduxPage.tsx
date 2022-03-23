import { Row } from "antd";
import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../Apps/redux";
import { GET_COURSES } from "../Apps/redux/todos/reducerTodo";
import Course from "../common/components/Course";
import { CourseModel, ICourse } from "../fake-data/course";

interface IProps extends PropsFromRedux {
  children?: React.ReactElement;
  name: string;
}

class ConnectPage extends Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.state = {};

    this.renderListCourses = this.renderListCourses.bind(this);
  }

  async componentDidMount() {
    const rs = await CourseModel.getCourses();
    this.props.getCourses(rs);
  }

  renderListCourses() {
    return this.props.courses.map((course) => {
      return <Course key={course.id} course={course} />;
    });
  }

  render() {
    return (
      <div>
        <h1>Connect page</h1>
        <Row>{this.renderListCourses()}</Row>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    courses: state.MODULE_TODO.courses,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    getCourses: function (data: ICourse[]) {
      dispatch({
        type: GET_COURSES,
        payload: data,
      });
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ConnectPage);
