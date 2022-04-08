import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import CategoryApi from "../../../apis/services/category";
import { ICategory } from "../../products/constant";

export default function useEdit() {
  const history = useHistory();
  const { mutate, isError, error, isLoading, isSuccess } = useMutation((data: ICategory) => {
    return CategoryApi.update(data).then(() => {
      enqueueSnackbar("Edit category successfully", { variant: "success" });
      history.goBack();
    });
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("Fail to edit", { variant: "error" });
    }
  }, [isError]);

  return {
    handleEdit: mutate,
    isError,
    error,
    isLoading,
    isSuccess,
  };
}
