import React from "react";
import { useQuery } from "react-query";
import PostApi from "../../../services/posts";
import { IFilterPost, IPost } from "../interface/post";

interface IProps {
  limit?: number;
  page?: number;
  filter: IFilterPost;
}

export default function useGetPosts(props: IProps) {
  const { data, isError, error, isFetching } = useQuery({
    queryKey: [
      "posts",
      { limit: props.limit, page: props.page, ...props.filter },
    ],
    queryFn: function () {
      return PostApi.getAll({
        _limit: props.limit,
        _page: props.page,
        filter: props.filter,
      });
    },
    staleTime: 10000,
    keepPreviousData: true,
    retry: 3,
    retryDelay: (time: number) => time * 10000,
    refetchOnWindowFocus: false,
  });

  return {
    data: {
      data: data?.data || [],
      total: data?.total || 0,
    },
    isError,
    error,
    isFetching,
  };
}
