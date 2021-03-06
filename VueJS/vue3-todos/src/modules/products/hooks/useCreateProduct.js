import ProductApi from "@/service/products";
import { ref } from "vue";

export function useCreateProduct() {
  const isLoading = ref(true);

  const handleSubmit = async (data, onSuccess, onFail) => {
    isLoading.value = true;

    const { isError } = await ProductApi.create(data);

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
    handleSubmit,
    isLoading,
  };
}
