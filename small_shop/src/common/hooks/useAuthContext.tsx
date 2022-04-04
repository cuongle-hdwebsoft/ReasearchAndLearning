import { useContext } from "react";
import { AuthContext } from "../hocs/AuthContextProvider";

export default function useAuthContext() {
  const authContext = useContext(AuthContext);
  return authContext;
}
