import { useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import PostApi from "../../../services/posts";
import { IComment } from "../interface/comment";

export default function useCommentsPost(props: { postId: string }) {
  const { data, isError, hasNextPage, hasPreviousPage, fetchNextPage } =
    useInfiniteQuery(
      ["comments"],
      function ({ pageParam = 1 }) {
        return PostApi.getCommentsByPostId(props.postId as string, {
          _limit: 4,
          _page: pageParam,
        });
      },
      {
        refetchOnWindowFocus: true,
        retry: 3,
        retryDelay: (time) => time * 3,
        staleTime: 10000,
        cacheTime: 30000,
        getNextPageParam: function (lastPage, allPages) {
          // lastPage.nextPage will be a pageParam parameter in next fetch
          return lastPage.nextPage;
        },
        getPreviousPageParam: function (firstPage, allPages) {
          return undefined;
        },
      }
    );

  console.log(data);

  return {
    pages: (data?.pages as unknown as { data: IComment[] }[]) || [],
    isError,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
  };
}
