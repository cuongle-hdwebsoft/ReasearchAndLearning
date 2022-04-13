/* eslint-disable react-hooks/exhaustive-deps */
import { SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Query, QueryKey, useQueryClient } from "react-query";
import useDebounce from "../../../common/hooks/useDebounce";
import removeEmpty from "../../../common/utils/removeEmpty";
import { IFilterPost } from "../interface/post";
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
  const [filter, setFilter] = useState<IFilterPost>(_query.filter || {});
  const debounceFilter = useDebounce(filter);
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

  const handleChangeInputFilter =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(
        removeEmpty({
          ...filter,
          [key]: event.target.value,
        })
      );
    };

  const handleChangeSelectFilter =
    (key: string) => (event: SelectChangeEvent<string>) => {
      setFilter(
        removeEmpty({
          ...filter,
          [key]: event.target.value,
        })
      );
    };

  useEffect(() => {
    updateUrlShallow({ page, limit, ...filter });
  }, [limit, page, filter]);

  return {
    page: parseInt(String(page)),
    limit: parseInt(String(limit)),
    filter,
    debounceFilter,
    handleChangePage,
    handleChangePerRow,
    handleChangeInputFilter,
    handleChangeSelectFilter,
  };
}
