import { useState } from "react";

export default function useFilterPosts() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const handleChangePage = (page) => {
    setPage(page);
  };

  const handleChangeLimitPage = (limit) => {
    setLimit(limit);
  };

  return {
    page,
    limit,
    handleChangePage,
    handleChangeLimitPage,
  };
}
