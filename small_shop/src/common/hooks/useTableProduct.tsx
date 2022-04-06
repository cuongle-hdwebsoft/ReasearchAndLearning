import { loadProductsActionSaga } from "../../modules/products/actions";
import { IFilterProduct } from "../../modules/products/constant";
import { useProductFilterHook, useProductLimitHook, useProductPageHook } from "../../modules/products/hook";
import useTable from "./useTable";

export default function useTableProduct() {
  const limit = useProductLimitHook();
  const page = useProductPageHook();
  const filter = useProductFilterHook();

  const table = useTable<IFilterProduct>({
    actionLoad: loadProductsActionSaga,
    prevQuery: {
      limit,
      page,
      filter,
    },
  });

  return table;
}

// https://react-redux.js.org/api/hooks#equality-comparisons-and-updates
