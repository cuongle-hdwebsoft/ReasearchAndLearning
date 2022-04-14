import { QueryClient } from "react-query";
import PostApi from "../../../services/posts";
import { IFilterPost } from "../interface/post";

export default async function prefetchPosts(
  queryClient: QueryClient,
  limit?: number,
  page?: number,
  filter?: IFilterPost,
  sort?: string,
  order?: string
) {
  await queryClient.prefetchQuery(
    [
      "posts",
      {
        limit: parseInt(String(limit)),
        page: parseInt(String(page)),
        filter,
        sort,
        order,
      },
    ],
    function () {
      return PostApi.getAll({
        _limit: limit,
        _page: page,
        filter,
        _sort: sort,
        _order: order,
      });
    }
  );
}
