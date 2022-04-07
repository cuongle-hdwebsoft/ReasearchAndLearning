import useQuery from "../../../common/hooks/useQuery";
import { IFitlerCategory } from "../../products/constant";

export default function useQueryCategory() {
  const { url, query, updateUrlShallow } = useQuery<IFitlerCategory>();

  return {
    url,
    query,
    updateUrlShallow,
  };
}
