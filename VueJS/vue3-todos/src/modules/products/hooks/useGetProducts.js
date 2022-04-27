import { computed, watch } from "vue";
import { stringify } from "query-string";
import { useStore } from "vuex";

export const useGetProducts = function (page, limit, filter) {
  const store = useStore();
  const products = computed(() => store.state.products.products);
  const total = computed(() =>
    Math.ceil(store.state.products.total / limit.value)
  );
  const isLoadingProducts = computed(
    () => store.state.products.isLoadingProducts
  );

  watch(
    [page, limit, filter],
    function ([newPage, newLimit, newFilter]) {
      store.dispatch("handleLoadProducts", {
        limit: newLimit,
        page: newPage,
        filter: newFilter,
      });
      window.history.replaceState(
        {},
        null,
        "#/?" + stringify({ limit: newLimit, page: newPage, ...newFilter })
      );
    },
    {
      deep: true,
    }
  );

  return {
    products,
    page,
    limit,
    total,
    isLoading: isLoadingProducts,
  };
};
