import { IFilterProduct } from "../../modules/products/constant";
import useQuery from "./useQuery";

export default function useQueryProduct() {
  const { query, url } = useQuery<IFilterProduct>();
  return {
    query,
    url,
  };
}
