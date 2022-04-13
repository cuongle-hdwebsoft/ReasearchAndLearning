import React from "react";
import useQueryParams from "../../../common/hooks/useQueryParams";
import { IPostPaginationFilter } from "../interface/post";

export default function useQueryParamPost() {
  const query = useQueryParams<IPostPaginationFilter>();

  return query;
}
