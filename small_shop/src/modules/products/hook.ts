import { useAppSelector } from "../hook";

export const useProductReducerHook = () => {
  return useAppSelector((state) => state.APP_PRODUCT);
};

export const useProductIsDeleting = () => {
  return useAppSelector((state) => state.APP_PRODUCT.isDeleting);
};
