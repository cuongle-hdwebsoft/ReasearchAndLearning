import React from "react";
import useQueryParams from "../../../common/hooks/useQueryParams";
import { IPostQuery } from "../interface/post";

export default function useQueryParamPost() {
  const query = useQueryParams<IPostQuery>();

  return query;
}
