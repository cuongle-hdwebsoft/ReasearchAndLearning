import { useContext } from "react";
import { ModalCustomContext } from "../components/ModalProvider";

export default function useModal() {
  const modalContext = useContext(ModalCustomContext);
  return modalContext;
}
