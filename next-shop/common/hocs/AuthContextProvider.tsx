import React, { createContext } from "react";
import useAuth from "../hooks/useAuth";

export interface IAuthContextProvider {
  isLogin: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  getMe: () => Promise<void>;
  handleSetLogin: (value: boolean) => void;
}

export interface IHandler {
  login: (username: string, password: string) => Promise<void>;
  getMe: () => Promise<void>;
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
  handleSetLogin: (value) => {},
};

export const AuthContext = createContext<IAuthContextProvider>(defaultContext);

export default function AuthContextProvider(handler: IHandler) {
  const value = useAuth(handler);

  return <AuthContext.Provider value={value}></AuthContext.Provider>;
}
