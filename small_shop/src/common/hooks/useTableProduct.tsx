import { loadProductsActionSaga } from "../../modules/products/actions";
import { ILoadProductParams } from "../../modules/products/constant";
import useTable from "./useTable";

export default function useTableProduct() {
  const table = useTable<ILoadProductParams>({ actionLoad: loadProductsActionSaga });

  return table;
}
