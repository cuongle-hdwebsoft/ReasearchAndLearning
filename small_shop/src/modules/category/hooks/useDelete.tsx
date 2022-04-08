import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import CategoryApi from "../../../apis/services/category";
import useModal from "../../../common/hooks/useModal";

export default function useDelete() {
  const modal = useModal();
  const queryClient = useQueryClient();

  const { mutate, isError, error, isLoading, isSuccess } = useMutation(
    (id: string | number) => {
      return CategoryApi.delete(id).then(() => {
        enqueueSnackbar("Delete category successfully", { variant: "success" });
        modal.close();
      });
    },
    {
      onSuccess: function () {
        queryClient.invalidateQueries("categories");
      },
    },
  );
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isError) {
      console.log(error);
      enqueueSnackbar("Fail to delete", { variant: "error" });
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
