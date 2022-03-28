import { useContext } from "react";
import { AppContext, IAppContext } from "../../common/context/app";
import { useAppSelector } from "../hook";

export const useAppReducerHook = () => {
  return useAppSelector((state) => state.APP_MODULE);
};

export const useAppContextHook = () => {
  const context = useContext<IAppContext>(AppContext);

  return context;
};
