import { QueryClient } from "react-query";
import CategoryApi from "../../../services/category";

export default async function prefetchCategories(queryClient: QueryClient) {
  await queryClient.prefetchQuery("categories", function () {
    return CategoryApi.getAll();
  });
}
