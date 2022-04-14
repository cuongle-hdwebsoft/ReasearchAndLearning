import React, { useContext } from "react";
import { AuthContext } from "../hocs/AuthContextProvider";

export default function useAuthContext() {
  const context = useContext(AuthContext);

  return context;
}
