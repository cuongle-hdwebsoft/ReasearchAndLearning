import { Modal } from "@mui/material";
import React, { ReactNode } from "react";

interface IProps {
  children?: React.ReactElement | React.ReactElement[];
  onOpen?: () => void;
  onClose?: () => void;
}

interface IState {
  open: boolean;
}

export default class CustomModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  render(): ReactNode {
    const { open } = this.state;

    return (
      <Modal onClose={this.handleClose} open={open}>
        <>{this.props.children}</>
      </Modal>
    );
  }
}
