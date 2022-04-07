import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useMutation } from "react-query";
import CategoryApi from "../../../apis/services/category";
import useModal from "../../../common/hooks/useModal";

export default function useDelete() {
  const modal = useModal();
  const { mutate, isError, error, isLoading, isSuccess } = useMutation((id: string | number) => {
    return CategoryApi.delete(id).then(() => {
      enqueueSnackbar("Delete category successfully", { variant: "success" });
      modal.close();
    });
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("Fail to delete");
    }
  }, [isError]);

  return {
    handleDelete: mutate,
    isError,
    error,
    isLoading,
    isSuccess,
  };
}
