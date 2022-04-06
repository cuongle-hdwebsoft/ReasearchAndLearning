import { useDispatch } from "react-redux";
import { editProductActionSaga } from "../actions";
import { IFormProduct } from "../constant";

export default function useEdit<T>() {
  const dispatch = useDispatch();

  const handleEdit = (value: T, id: string) => {
    dispatch(editProductActionSaga({ ...value, id: id } as unknown as IFormProduct & { id: string | number }));
  };

  return {
    handleEdit,
  };
}
