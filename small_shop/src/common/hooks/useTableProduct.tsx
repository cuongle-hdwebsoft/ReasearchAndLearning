import { loadProductsActionSaga } from "../../modules/products/actions";
import { IFilterProduct } from "../../modules/products/constant";
import { useProductReducerHook } from "../../modules/products/hook";
import useTable from "./useTable";

export default function useTableProduct() {
  const reducerProduct = useProductReducerHook();
  const table = useTable<IFilterProduct>({
    actionLoad: loadProductsActionSaga,
    prevQuery: {
      limit: reducerProduct.limit,
      page: reducerProduct.page,
      filter: reducerProduct.filter,
    },
  });

  return table;
}
