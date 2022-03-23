import React from "react";

interface IAppContext {
  theme?: string;
  lang?: string;
  isLogin: boolean;
  setTheme?: (value: string) => void;
  handleSetLang: () => void;
  setIsLogin: (value: boolean) => void;
}

export const AppContext = React.createContext<IAppContext>({
  handleSetLang: () => {
    console.log("handleSetLang");
  },
  isLogin: true,
  setIsLogin: () => {
    console.log("setIsLogin");
  },
});
