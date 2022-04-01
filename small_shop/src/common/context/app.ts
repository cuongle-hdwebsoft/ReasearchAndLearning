import { createContext } from "react";

export interface IAppContext {
  theme: "light" | "dark";
  toggleTheme?: () => void;
  toggleLang?: () => void;
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  lang?: "en" | "vi";
}

export const AppContext = createContext<IAppContext>({
  theme: "dark",
  isLogin: false,
  setIsLogin: () => {
    console.log("setIsLogin");
  },
});
