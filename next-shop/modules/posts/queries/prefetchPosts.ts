import { QueryClient } from "react-query";
import PostApi from "../../../services/posts";

export default async function prefetchPosts<T>(
  queryClient: QueryClient,
  limit?: number,
  page?: number,
  filter?: T
) {
  await queryClient.prefetchQuery(
    [
      "posts",
      {
        limit: parseInt(String(limit)),
        page: parseInt(String(page)),
        filter,
      },
    ],
    function () {
      return PostApi.getAll({ _limit: limit, _page: page, filter });
    }
  );
}
