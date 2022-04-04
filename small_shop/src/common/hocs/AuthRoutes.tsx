import React from "react";
import { Route, Switch } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
interface IProps {
  children?: React.ReactElement | React.ReactElement[] | any;
  path: string;
  loginPage?: JSX.Element;
}

export default function AuthRoutes(props: IProps) {
  const { isLogin, isLoading } = useAuthContext();
  const { loginPage, children, path } = props;

  if (isLoading) {
    return null;
  }

  if (!isLoading && !isLogin) {
    return loginPage ? loginPage : <></>;
  }

  return (
    <Route path={path}>
      <Switch>{children}</Switch>
    </Route>
  );
}
