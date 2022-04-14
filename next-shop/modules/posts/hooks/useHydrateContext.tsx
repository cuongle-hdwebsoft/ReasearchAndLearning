import { useContext } from "react";
import { HydrateContext } from "../../../common/hooks/HydrateContextProvider";

export default function useHydrateContext(queryKey: string) {
  const context = useContext(HydrateContext);

  console.log(context);

  let dyhydrateState = context
    ? context.queries.find((item) => item.queryKey[0] === queryKey)
    : null;

  return dyhydrateState;
}
