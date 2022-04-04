import React, { createContext } from "react";
import UserApi from "../../apis/services/users";
import useAuth from "../hooks/useAuth";

export interface IHandler {
  login: (username: string, password: string) => Promise<any>;
  getMe: () => Promise<any>;
}

interface IAuthContextProvider {
  children?: React.ReactElement | React.ReactElement[];
  handlers: IHandler;
}

interface IAuthContext extends IHandler {
  isLoading?: boolean;
  isLogin?: boolean;
  account?: any;
  error?: unknown;
  setIsLoading: (value: boolean) => void;
  setAccount: (value: any) => void;
  setIsLogin: (value: boolean) => void;
  setError: (value: any) => void;
}

export const defaultHandler = {
  login: (username: string, password: string) => {
    console.log(username, password);
    return Promise.resolve();
  },

  getMe: () => {
    return Promise.resolve({ username: "", password: "", firstName: "", lastName: "", gender: "male" });
  },
  setIsLoading: (value: boolean) => {
    console.log(value);
  },
  setAccount: (value: any) => {
    console.log(value);
  },
  setIsLogin: (value: boolean) => {
    console.log(value);
  },
  setError: (value: any) => {
    console.log(value);
  },
};

export const handler = {
  login: (username: string, password: string) => {
    return UserApi.login(username, password);
  },
  getMe: () => {
    return UserApi.getMe();
  },
};

export const AuthContext = createContext<IAuthContext>(defaultHandler);

export default function AuthContextProvider(props: IAuthContextProvider) {
  const authContext = useAuth(props.handlers);

  return <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>;
}

// Provider nhận vào các hàm handler, dùng useAuth để kiểm tra login và extract các properties và handler
// properties: isLogin, isLoading, account, error
// handler: login, logout, getMe
