import React from "react";
import { useDispatch } from "react-redux";
import { createProductActionSaga } from "../actions";
import { IFormProduct } from "../constant";

export default function useCreate<T>() {
  const dispatch = useDispatch();

  const handleCreate = (value: T) => {
    dispatch(createProductActionSaga(value as unknown as IFormProduct));
  };

  return React.useMemo(() => ({ handleCreate }), []);
}
