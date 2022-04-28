import ProductApi from "@/service/products";
import { ref } from "vue";

export function useEditProduct() {
  const isLoading = ref(false);

  const handleSubmit = async function (data, onSuccess, onError) {
    const { isError } = await ProductApi.edit(data);

    if (isError) {
      if (onError) {
        return onError();
      }
    }

    return onSuccess();
  };

  return {
    isLoading,
    handleSubmit,
  };
}
