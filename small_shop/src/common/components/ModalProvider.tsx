import styled from "@emotion/styled";
import { Modal, useTheme } from "@mui/material";
import React, { createContext, useState } from "react";

const CenterBox = styled.div<{ bg: string }>`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.bg};
  min-width: 700px;
  padding: 20px;
  border: 0.5px solid #fff;
  border-radius: 4px;
`;

interface IProps {
  children?: React.ReactElement | React.ReactElement[];
  onOpen?: () => void;
  onClose?: () => void;
}

export interface IModalCustomContext {
  isOpen: boolean;
  open: (Component: React.ReactElement) => void;
  close: () => void;
}

export const ModalCustomContext = createContext<IModalCustomContext>({
  isOpen: false,
  open: function () {
    console.log("open");
  },
  close: function () {
    console.log("close");
  },
});

export default function ModalProvider(props: IProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [component, setComponent] = useState<JSX.Element>(<></>);
  const theme = useTheme();

  const open = (c: JSX.Element) => {
    setComponent(c);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <ModalCustomContext.Provider value={{ isOpen, open, close }}>
      <Modal onClose={close} open={isOpen}>
        <CenterBox bg={theme.palette.background.paper}>{component}</CenterBox>
      </Modal>
      {props.children}
    </ModalCustomContext.Provider>
  );
}
