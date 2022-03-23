import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AppContext } from "../context/context";

interface IAuth {
  children: React.ReactElement;
  path: string;
  [param: string]: any;
}

export default function AuthRoute(props: IAuth) {
  const appContext = useContext(AppContext);

  if (!appContext.isLogin) {
    return <Redirect to="/" />;
  }

  return <Route {...props}></Route>;
}
