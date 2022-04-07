import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import CategoryApi from "../../../apis/services/category";
import { ICategory } from "../../products/constant";

export default function useCreate() {
  const history = useHistory();
  const { mutate, isError, error, isLoading, isSuccess } = useMutation((data: Omit<ICategory, "id">) => {
    return CategoryApi.create(data).then(() => {
      enqueueSnackbar("Create category successfully", { variant: "success" });
      history.goBack();
    });
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("Fail to create");
    }
  }, [isError]);

  return {
    handleCreate: mutate,
    isError,
    error,
    isLoading,
    isSuccess,
  };
}
