import ProductApi from "@/service/products";
import { ref } from "vue";

export function useCreateProduct() {
  const isLoading = ref(true);

  const handleSubmit = async (data, onSuccess, onFail) => {
    isLoading.value = true;

    const { isError } = await ProductApi.create(data);

    if (isError) {
      return onFail();
    }

    isLoading.value = false;

    if (onSuccess) {
      return onSuccess();
    }
  };

  return {
    handleSubmit,
    isLoading,
  };
}
