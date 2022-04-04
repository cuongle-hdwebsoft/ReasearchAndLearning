import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useAuthContext from "./useAuthContext";

export default function useLogin() {
  const { login, isLogin, setIsLogin } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  useEffect(() => {
    if (isLogin) {
      return history.push("/");
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      const user = await login(username, password);
      if (user) {
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("accessToken", "fake accessToken");
        localStorage.setItem("username", user.username);
        enqueueSnackbar("Login success", { variant: "success" });
        setIsLogin(true);
        history.push("/");
      } else {
        enqueueSnackbar("Username or password not match", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Login fail", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLogin,
    isLoading,
    handleLogin,
  };
}
