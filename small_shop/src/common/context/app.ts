import { createContext } from "react";

export interface IAppContext {
  theme: "light" | "dark";
  toggleTheme?: () => void;
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

export const AppContext = createContext<IAppContext>({
  theme: "dark",
  isLogin: false,
  setIsLogin: () => {
    console.log("setIsLogin");
  },
});

export interface IModalCustomContext {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const ModalCustomContext = createContext<IModalCustomContext>({
  isOpen: false,
  open: function () {
    console.log("open");
  },
  close: function () {
    console.log("close");
  },
});
