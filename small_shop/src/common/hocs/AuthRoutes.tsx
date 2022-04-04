import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { useAppContextHook } from "../../modules/app/hook";
interface IProps {
  children?: React.ReactElement | React.ReactElement[] | any;
  path: string;
}

export default function AuthRoutes(props: IProps) {
  const appContext = useAppContextHook();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [isFetchingAuth, setIsFetchingAuth] = useState(true);

  const t = useRef<number>();

  useEffect(() => {
    const getData = async () => {
      let accessToken;
      let isLogin;
      let isValid;

      await new Promise((resolve) =>
        setTimeout(() => {
          accessToken = localStorage.getItem("accessToken");
          isLogin = localStorage.getItem("isLogin");
          isValid = true;
          resolve(0);
        }, 3000),
      );

      if (!isLogin || !accessToken || !isValid) {
        localStorage.clear();
        history.push("/login");
      }

      appContext.setIsLogin(true);
      console.log(1);
      setIsFetchingAuth(false);
      console.log(2);
    };

    getData();

    return () => {
      console.log(3);
      if (t.current) {
        clearTimeout(t.current);
      }
    };
  }, []);

  console.log("Child render isFetchingAuth, isLogin", isFetchingAuth, appContext.isLogin);

  if (isFetchingAuth) {
    return null;
  }

  if (!isFetchingAuth && !appContext.isLogin) {
    return <Redirect to="/login" />;
  }

  return (
    <Route path={props.path}>
      <Switch>{props.children}</Switch>
    </Route>
  );
}
