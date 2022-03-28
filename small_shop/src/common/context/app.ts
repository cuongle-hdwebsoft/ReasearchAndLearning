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
