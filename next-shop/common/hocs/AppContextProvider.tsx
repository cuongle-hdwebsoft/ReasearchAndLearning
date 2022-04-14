import React, { createContext, useEffect, useState } from "react";
import { IUser } from "../../modules/users/interface/user";

export interface IAppContext {
  user: IUser | null;
  lang: string | undefined;
  theme: string | undefined;
  setUser: (user: IUser | null) => void;
  setLang: (value: string) => void;
  setTheme: (value: string) => void;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export default function AppContextProvider(props: { children: JSX.Element }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [lang, setLang] = useState<string>();
  const [theme, setTheme] = useState<string>();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(
        JSON.parse(
          localStorage.getItem("user") as unknown as string
        ) as unknown as IUser
      );
    }

    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme") as unknown as string);
    }

    if (localStorage.getItem("lang")) {
      setLang(localStorage.getItem("lang") as unknown as string);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        lang,
        theme,
        setUser,
        setLang,
        setTheme,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
