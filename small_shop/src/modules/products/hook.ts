import { shallowEqual } from "react-redux";
import { useAppSelector } from "../hook";

export const useProductReducerHook = () => {
  return useAppSelector((state) => state.APP_PRODUCT);
};

export const useProductIsDeleting = () => {
  return useAppSelector((state) => state.APP_PRODUCT.isDeleting);
};

export const useProductLimitHook = () => {
  return useAppSelector((state) => state.APP_PRODUCT.limit);
};

export const useProductPageHook = () => {
  return useAppSelector((state) => state.APP_PRODUCT.limit);
};

export const useProductFilterHook = () => {
  return useAppSelector((state) => state.APP_PRODUCT.filter, shallowEqual);
};
