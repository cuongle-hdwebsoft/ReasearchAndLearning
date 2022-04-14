import React, { useEffect, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { IHandler } from "../hocs/AuthContextProvider";

export default function useAuth(handler: IHandler) {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleSetLogin = (value: boolean) => {
    setIsLogin(value);
  };

  useEffect(() => {
    try {
      unstable_batchedUpdates(async () => {
        setLoading(true);
        setIsLogin(false);
        await handler.getMe();
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  }, [handler]);

  return {
    isLogin,
    isLoading,
    handleSetLogin,
    ...handler,
  };
}
