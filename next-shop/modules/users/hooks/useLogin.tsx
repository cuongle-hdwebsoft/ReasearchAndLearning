import React from "react";
import { setCookies } from "cookies-next";
import { useSnackbar } from "notistack";
import useAuthContext from "../../../common/hooks/useAuthContext";
import { useRouter } from "next/router";
import useApp from "../../../common/hooks/useApp";
import { IUser } from "../interface/user";

export interface IFormState {
  username: string;
  password: string;
}

export default function useLogin() {
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuthContext();
  const { setUser } = useApp();
  const router = useRouter();

  const handleLogin = async (values: IFormState) => {
    try {
      const { accessToken, user } = await login(
        values.username,
        values.password
      );
      setCookies("accessToken", accessToken, {
        expires: new Date(Date.now() + 86400 * 1000),
        path: "/",
      });
      setUser(user as unknown as IUser);
      localStorage.setItem("user", JSON.stringify(user));
      enqueueSnackbar("Login successfully", { variant: "success" });
      router.push("/");
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Login fail", { variant: "error" });
    }
  };

  return {
    handleLogin,
  };
}
