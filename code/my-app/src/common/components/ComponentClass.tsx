import React from "react";

interface IProps {
  text?: string;
  theme?: string;
}

interface IState {
  count: number;
}

class ComponentClass extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      count: 0,
    };

    this.handleClickButton = this.handleClickButton.bind(this);
  }

  handleClickButton() {
    this.setState({
      ...this.state,
      count: this.state.count + 1,
    });
  }

  componentWillMount() {
    console.log("ComponentClass componentWillMount");
  }

  componentWillReceiveProps(nextProps: IProps) {
    console.log("ComponentClass componentWillReceiveProps", nextProps);
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    console.log("ComponentClass shouldComponentUpdate");
    return true;
  }

  componentWillUpdate() {
    console.log("ComponentClass componentWillUpdate");
  }

  render(): React.ReactNode {
    console.log("ComponentClass render");
    return (
      <div onClick={this.handleClickButton} className="class-component">
        ComponentClass {this.state.count}
      </div>
    );
  }

  componentDidUpdate() {
    console.log("ComponentClass componentDidUpdate");
  }

  componentDidMount() {
    console.log("ComponentClass componentDidMount");
  }

  componentWillUnmount() {
    console.log("ComponentClass componentWillUnmount");
  }
}

export default ComponentClass;
