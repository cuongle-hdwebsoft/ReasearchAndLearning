import { useContext } from "react";
import { AppContext } from "../hocs/AppContextProvider";

export default function useApp() {
  const context = useContext(AppContext);

  return context;
}
