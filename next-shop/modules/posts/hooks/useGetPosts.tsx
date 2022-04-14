import React from "react";
import { useQuery } from "react-query";
import removeEmpty from "../../../common/utils/removeEmpty";
import PostApi from "../../../services/posts";
import { IFilterPost } from "../interface/post";

interface IProps {
  limit?: number;
  page?: number;
  filter: IFilterPost;
  sort?: string;
  order?: string;
}

export default function useGetPosts(props: IProps) {
  const { data, isError, error, isFetching } = useQuery({
    queryKey: [
      "posts",
      {
        limit: props.limit,
        page: props.page,
        filter: props.filter,
        sort: props.sort,
        order: props.order,
      },
    ],
    queryFn: function () {
      return PostApi.getAll({
        _limit: props.limit,
        _page: props.page,
        filter: removeEmpty(props.filter),
        _sort: props.sort,
        _order: props.order,
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
