/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useState } from "react";
import { DehydratedState, useQueryClient } from "react-query";
import useDebounce from "../../../common/hooks/useDebounce";
import removeEmpty from "../../../common/utils/removeEmpty";
import { IFilterPost } from "../interface/post";
import useHydrateContext from "./useHydrateContext";
import useQueryParamPost from "./useQueryParamPost";

export default function useFilterPost() {
  const postsDehydrate = useHydrateContext("posts");
  const {
    queryKey: [_key, _query],
  } = postsDehydrate as any;
  const [page, setPage] = useState(parseInt(String(_query.page)) || 1);
  const [limit, setLimit] = useState(parseInt(String(_query.limit)) || 8);
  const [filter, setFilter] = useState<IFilterPost>(_query.filter || {});
  const [sort, setSort] = useState(_query.sort || "");
  const [order, setOrder] = useState(_query.order || "");
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
      setFilter({
        ...filter,
        [key]: event.target.value,
      });
    };

  const handleChangeSelectFilter =
    (key: string) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFilter({
        ...filter,
        [key]: event.target.value,
      });
    };

  const handleSortFilter = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value = e.target.value;
    let splits = value.split("-");
    const [_sort, _order] = splits;

    setSort(_sort);
    setOrder(_order);
  };

  const handleClearFilter = () => {
    setFilter({});
    setLimit(8);
    setPage(1);
    setOrder("");
    setSort("");
  };

  useEffect(() => {
    updateUrlShallow(removeEmpty({ page, limit, ...filter, sort, order }));
  }, [limit, page, filter, sort, order]);

  return {
    page: parseInt(String(page)),
    limit: parseInt(String(limit)),
    filter,
    order,
    sort,
    debounceFilter,
    handleSortFilter,
    handleChangePage,
    handleClearFilter,
    handleChangePerRow,
    handleChangeInputFilter,
    handleChangeSelectFilter,
  };
}
