import { ICategory } from "../interface/post";
import useHydrateContext from "../../../common/hooks/useHydrateContext";

export default function useGetCacheCategories() {
  const data = useHydrateContext("categories");

  return {
    categories: (data?.state.data as unknown as ICategory[]) || [],
  };
}
