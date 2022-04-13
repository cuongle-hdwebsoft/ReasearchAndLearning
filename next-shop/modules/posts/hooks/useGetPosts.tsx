import React from "react";
import { useQuery } from "react-query";
import PostApi from "../../../services/posts";
import { IPost } from "../interface/post";

interface IProps {
  limit?: number;
  page?: number;
  initialPost?: IPost[];
}

export default function useGetPosts(props: IProps) {
  const { data, isError, error, isFetching } = useQuery({
    queryKey: ["posts", { limit: props.limit, page: props.page }],
    queryFn: function () {
      return PostApi.getAll({ _limit: props.limit, _page: props.page });
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
