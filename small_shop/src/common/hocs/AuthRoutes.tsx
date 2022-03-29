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
    try {
      const getData = async () => {
        await new Promise((resolve) => {
          t.current = window.setTimeout(() => {
            const accessToken = localStorage.getItem("accessToken");
            const isLogin = localStorage.getItem("isLogin");
            console.log("check auth", accessToken, isLogin);
            const isValid = true;

            if (!isLogin || !accessToken) {
              localStorage.clear();
              history.push("/login");
              return resolve(null);
            }

            if (!isValid) {
              localStorage.clear();
              history.push("/login");
              return resolve(null);
            }

            appContext.setIsLogin(true);
            setIsFetchingAuth(false);
            resolve(0);
          }, 500);
        });
      };

      getData();

      return () => {
        if (t.current) {
          clearTimeout(t.current);
        }
      };
    } catch (error) {
      enqueueSnackbar("Something wrong");
    }
  }, []);

  // console.log("Child render", isFetchingAuth, appContext.isLogin);

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
