import { useEffect, useState } from "react";
import { IHandler } from "../hocs/AuthContextProvider";

export default function useAuth(handler: IHandler) {
  const [isLoading, setIsLoading] = useState(true);
  const [account, setAccount] = useState<any>();
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const result = await handler.getMe();
        if (result) {
          setIsLogin(true);
          setAccount(result);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    ...handler,
    isLoading,
    isLogin,
    account,
    error,
    setIsLoading,
    setAccount,
    setIsLogin,
    setError,
  };
}
