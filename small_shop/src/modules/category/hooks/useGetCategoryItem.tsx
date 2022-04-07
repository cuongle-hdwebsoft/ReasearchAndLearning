import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CategoryApi from "../../../apis/services/category";

export default function useGetCategoryItem() {
  const params = useParams<{ id: string }>();
  const { data, isError, error, isFetching } = useQuery(
    ["category", params.id],
    function () {
      return CategoryApi.getById(params.id);
    },
    {
      enabled: !!params.id,
    },
  );

  return {
    id: params.id,
    category: data?.data as any,
    isError,
    error,
    isFetching,
  };
}
