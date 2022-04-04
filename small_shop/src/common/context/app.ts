import { createContext } from "react";

export interface IAppContext {
  theme: "light" | "dark";
  toggleTheme?: () => void;
  toggleLang?: () => void;
  lang?: "en" | "vi";
}

export const AppContext = createContext<IAppContext>({
  theme: "dark",
});
