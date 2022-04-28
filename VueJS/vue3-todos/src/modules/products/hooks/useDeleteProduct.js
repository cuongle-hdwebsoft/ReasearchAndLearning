import ProductApi from "@/service/products";
import { ref } from "vue";

export function useDeleteProduct() {
  const isLoading = ref(false);

  const handleSubmit = async function (id, onSuccess, onFail) {
    isLoading.value = true;

    const { isError } = await ProductApi.delete(id);

    isLoading.value = false;

    if (isError) {
      if (onFail) {
        onFail();
      }

      return;
    }

    if (onSuccess) {
      return onSuccess();
    }
  };

  return {
    isLoading,
    handleSubmit,
  };
}
