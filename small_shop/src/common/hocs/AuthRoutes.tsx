import React, { useEffect, useRef, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useAppContextHook } from "../../modules/app/hook";

interface IProps {
  children?: React.ReactElement | React.ReactElement[] | any;
  path: string;
}

export default function AuthRoutes(props: IProps) {
  const appContext = useAppContextHook();
  const [isFetchingAuth, setIsFetchingAuth] = useState(true);
  const t = useRef<number>();

  useEffect(() => {
    try {
      const getData = async () => {
        await new Promise((resolve) => {
          t.current = window.setTimeout(() => {
            appContext.setIsLogin(false);
            setIsFetchingAuth(false);
            resolve(0);
          }, 1000);
        });
      };

      getData();

      return () => {
        if (t.current) {
          clearTimeout(t.current);
        }
      };
    } catch (error) {}
  }, []);

  console.log(`appContext.isLogin ${appContext.isLogin} - isFetchingAuth ${isFetchingAuth}`);

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
