import { computed, onBeforeMount, watch } from "vue";
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
  let t;

  watch(
    [page, limit],
    function ([newPage, newLimit]) {
      store.dispatch("handleLoadProducts", {
        limit: newLimit,
        page: newPage,
        filter: filter.value,
      });

      window.history.replaceState(
        {},
        null,
        "#/?" +
          stringify({ limit: limit.value, page: page.value, ...filter.value })
      );
    },
    {
      deep: true,
    }
  );

  watch(
    filter,
    function (newFilter, oldFilter, onCleanup) {
      onCleanup(function () {
        if (t) {
          clearTimeout(t);
        }
      });

      t = setTimeout(() => {
        store.dispatch("handleLoadProducts", {
          limit: limit.value,
          page: page.value,
          filter: newFilter,
        });
      }, 1000);

      window.history.replaceState(
        {},
        null,
        "#/?" +
          stringify({ limit: limit.value, page: page.value, ...newFilter })
      );
    },
    {
      deep: true,
    }
  );

  onBeforeMount(() => {
    store.dispatch("handleLoadProducts", {
      limit: limit.value,
      page: page.value,
      filter: filter.value,
    });
  });

  return {
    products,
    page,
    limit,
    total,
    isLoading: isLoadingProducts,
  };
};
