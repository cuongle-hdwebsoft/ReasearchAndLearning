/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Query, QueryKey, useQueryClient } from "react-query";
import useQueryParamPost from "./useQueryParamPost";

export default function useFilterPost() {
  const query = useQueryClient();
  const queryCache = query.getQueryCache();
  const {
    queryKey: [_key, _query],
  } = queryCache.find("posts", {
    exact: false,
  }) as any;
  const [page, setPage] = useState(parseInt(String(_query.page)) || 1);
  const [limit, setLimit] = useState(parseInt(String(_query.limit)) || 8);
  const { updateUrlShallow } = useQueryParamPost();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page + 1);
  };

  const handleChangePerRow = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPage(1);
    setLimit(parseInt(event.target.value));
  };

  useEffect(() => {
    updateUrlShallow({ page, limit });
  }, [limit, page]);

  return {
    page: parseInt(String(page)),
    limit: parseInt(String(limit)),
    handleChangePage,
    handleChangePerRow,
  };
}
