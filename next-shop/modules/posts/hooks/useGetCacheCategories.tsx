import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { ICategory } from "../interface/post";

export default function useGetCacheCategories() {
  const query = useQueryClient();
  const queryCache = query.getQueryCache();
  const {
    state: { data },
  } = queryCache.find("categories", {
    exact: false,
  }) as any;

  return {
    categories: data as ICategory[],
  };
}
