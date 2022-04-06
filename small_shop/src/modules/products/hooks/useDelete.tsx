import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useModal from "../../../common/hooks/useModal";
import useTableProduct from "../../../common/hooks/useTableProduct";
import { deleteProductActionSaga } from "../actions";
import { useProductIsDeleting } from "../hook";

export default function useDelete() {
  const dispatch = useDispatch();
  const isDeleting = useProductIsDeleting();
  const modal = useModal();
  const table = useTableProduct();
  const [isLoading, setIsLoading] = useState(false);

  // console.log("useDelete", isDeleting, isLoading);

  const handleDelete = (id: string | number) => {
    setIsLoading(true);
    dispatch(deleteProductActionSaga(typeof id === "number" ? String(id) : id));
  };

  useEffect(() => {
    if (isLoading === true && isDeleting === false && modal.isOpen === true) {
      setIsLoading(false);
      modal.close();
      table.init({});
    }
  }, [isDeleting]);

  return React.useMemo(
    () => ({
      handleDelete,
      isDeleting,
    }),
    [isDeleting],
  );
}
