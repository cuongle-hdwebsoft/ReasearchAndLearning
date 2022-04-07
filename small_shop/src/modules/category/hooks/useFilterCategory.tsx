import React, { useEffect, useState } from "react";
import { IFitlerCategory } from "../../products/constant";
import useQueryCategory from "./useQueryCategory";

export default function useFilterCategory() {
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(0);
  const [limit] = useState(10);
  const { updateUrlShallow } = useQueryCategory();

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

    setFilter(newFilter);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, nextPage: number) => {
    setPage(nextPage);
  };

  useEffect(() => {
    updateUrlShallow({ ...filter, page, limit });
  }, [filter]);

  return {
    handleFilterInput,
    handleChangePage,
    filter: filter as IFitlerCategory,
    limit,
    page,
  };
}
