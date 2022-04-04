import React from "react";
import { AppContext } from "../context/app";

export default function AppProvider(props: any) {
  console.log(props.value);
  return <AppContext.Provider value={props.value}>{props.children}</AppContext.Provider>;
}
