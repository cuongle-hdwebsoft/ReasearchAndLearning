import ProductApi from "@/service/products";
import { onBeforeMount, ref } from "vue";

export function useGetProductById(id) {
  const isLoading = ref(false);
  const product = ref(null);
  const isError = ref(null);

  onBeforeMount(async function () {
    console.log("useGetProductById onBeforeMount");
    isLoading.value = true;
    const { data, _isError } = await ProductApi.getById(id);

    if (_isError) {
      alert("load fail");
    }

    product.value = data;
    isError.value = _isError;

    isLoading.value = false;
  });

  return {
    isLoading,
    product,
    isError,
  };
}
