import React, { createContext } from "react";
import UsersApi from "../../services/users";
import useAuth from "../hooks/useAuth";
import { getCookie } from "cookies-next";

export interface IAuthContextProvider {
  isLogin: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<any>;
  getMe: () => Promise<any>;
  setIsLogin: (value: boolean) => void;
  setLoading: (value: boolean) => void;
}

export interface IHandler {
  login: (username: string, password: string) => Promise<any>;
  getMe: () => Promise<any>;
}

export const defaultContext: IAuthContextProvider = {
  isLogin: false,
  isLoading: false,
  login: (username: string, password: string) => {
    return Promise.resolve();
  },
  getMe: () => {
    return Promise.resolve();
  },
  setIsLogin: (value) => {},
  setLoading: (value) => {},
};

export const handler: IHandler = {
  login: (username: string, password: string) => {
    return UsersApi.login(username, password);
  },
  getMe: async () => {
    let accessToken = getCookie("accessToken") as string;

    if (!accessToken) {
      throw new Error("Missing accessToken");
    }

    await UsersApi.getMe(accessToken);
  },
};

export const AuthContext = createContext<IAuthContextProvider>(defaultContext);

export default function AuthContextProvider(props: {
  handler: IHandler;
  children: JSX.Element;
}) {
  const value = useAuth(handler);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
