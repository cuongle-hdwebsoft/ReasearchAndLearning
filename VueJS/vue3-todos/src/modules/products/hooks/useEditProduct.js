import ProductApi from "@/service/products";
import { ref } from "vue";

export function useEditProduct() {
  const isLoading = ref(false);

  const handleSubmit = async function (data, onSuccess, onError) {
    isLoading.value = true;

    const { isError } = await ProductApi.edit(data);

    isLoading.value = false;

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
