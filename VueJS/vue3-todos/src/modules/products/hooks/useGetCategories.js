import CategoryApi from "@/service/categories";
import { onBeforeMount, ref } from "vue";

export function useGetCategories() {
  const categories = ref([]);

  onBeforeMount(async () => {
    const { data } = await CategoryApi.getAll();

    categories.value = data.map((d) => d.name);
  });

  return {
    categories,
  };
}
