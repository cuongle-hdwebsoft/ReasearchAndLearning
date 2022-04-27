import { computed, onBeforeMount, onBeforeUpdate, ref, watch } from "vue";
import { useStore } from "vuex";

export const useGetProducts = function () {
  const store = useStore();
  const products = computed(() => store.state.products.products);
  const total = computed(() => store.state.products.total);
  const page = ref(1);
  const limit = ref(8);

  onBeforeMount(function () {
    store.dispatch("handleLoadProducts", {});
  });

  onBeforeUpdate(function () {
    console.log(limit, page);
    // store.dispatch("handleLoadProducts", { limit, page });
  });

  watch([page, limit], function ([newPage, newLimit]) {
    store.dispatch("handleLoadProducts", { limit: newLimit, page: newPage });
  });

  return {
    products,
    page,
    limit,
    total,
  };
};
