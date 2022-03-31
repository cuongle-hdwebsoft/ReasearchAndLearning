import { useSnackbar } from "notistack";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import CustomModal from "../components/CustomModal";

interface IProps {
  children: React.ReactElement | React.ReactElement[];
}

export default function PublicUtils(props: IProps) {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const modalRef = useRef<any>();

  window.app = {
    history: null,
  };
  window.app.enqueueSnackbar = enqueueSnackbar;
  window.app.history = history;

  useEffect(() => {
    window.app.modal = {
      open: modalRef.current.handleOpen,
      close: modalRef.current.handleClose,
    };
  }, []);

  return (
    <>
      <CustomModal ref={modalRef}>
        <div style={{ color: "#fff" }}>Test</div>
      </CustomModal>
      {props.children}
    </>
  );
}
