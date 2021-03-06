import React, { useEffect, useState } from "react";
import { IFitlerCategory } from "../../products/constant";
import useQueryCategory from "./useQueryCategory";

export default function useFilterCategory() {
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const { updateUrlShallow, query } = useQueryCategory();

  const handleFilterInput = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter: any = {
      ...filter,
      [key]: e.target.value,
    };

    Object.keys(newFilter).forEach((key) => {
      if (newFilter[key] === "") {
        delete newFilter[key];
      }
    });

    setPage(0);
    setFilter(newFilter);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, nextPage: number) => {
    setPage(nextPage);
  };

  useEffect(() => {
    setPage(parseInt(String(query.page)) || 0);
    setLimit(parseInt(String(query.limit)) || 10);
    Object.keys(query).forEach((key) => {
      if (key !== "page" && key !== "limit") {
        setFilter({ ...filter, [key]: query[key] });
      }
    });
  }, []);

  useEffect(() => {
    updateUrlShallow({ ...filter, page, limit });
  }, [filter, limit, page]);

  return {
    handleFilterInput,
    handleChangePage,
    filter: filter as IFitlerCategory,
    limit,
    page,
  };
}
