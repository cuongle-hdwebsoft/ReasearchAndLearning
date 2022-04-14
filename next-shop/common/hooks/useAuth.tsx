import { useState } from "react";
import { IHandler } from "../hocs/AuthContextProvider";

export default function useAuth(handler: IHandler) {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setLoading] = useState(false);

  return {
    isLogin,
    isLoading,
    setIsLogin,
    setLoading,
    ...handler,
  };
}
