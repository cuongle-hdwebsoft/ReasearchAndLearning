import React from "react";
import { DehydratedState } from "react-query";

export const HydrateContext = React.createContext<DehydratedState>(
  {} as DehydratedState
);

export default function HydrateContextProvider(props: {
  children: JSX.Element;
  dehydratedState: DehydratedState;
}) {
  return (
    <HydrateContext.Provider value={props.dehydratedState}>
      {props.children}
    </HydrateContext.Provider>
  );
}
