import { IFilterProduct } from "../constant";
import useQuery from "../../../common/hooks/useQuery";

export default function useQueryProduct() {
  const { query, url } = useQuery<IFilterProduct>();
  return {
    query,
    url,
  };
}
