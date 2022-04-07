import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import CategoryApi from "../../../apis/services/category";
import { ICategory } from "../../products/constant";

export default function useGetCategories({
  limit = 10,
  page = 0,
  filter,
}: {
  limit: number;
  page: number;
  filter?: ICategory;
}) {
  const { data, status, error, isLoading, isError, ...rest } = useQuery(
    ["categories", { page, limit, ...filter }],
    function () {
      return CategoryApi.getAll({ _limit: limit, _page: page + 1, ...filter });
    },
    {
      refetchOnWindowFocus: false,
      retry: 3,
      retryDelay: (times) => Math.min(times * 1000, 30000),
      keepPreviousData: true,
      staleTime: 5000,
      placeholderData: { error: null, total: 0, data: [] },
    },
  );
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (rest.isRefetching) {
      enqueueSnackbar("Re-fetching", { variant: "info" });
    }
  }, [rest.isRefetching]);

  return {
    data,
    status,
    error: error as string,
    isLoading,
    isError,
    ...rest,
  };
}
