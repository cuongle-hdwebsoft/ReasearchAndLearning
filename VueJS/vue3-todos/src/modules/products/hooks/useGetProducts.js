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
  let t;

  watch(
    [page, limit, filter],
    // eslint-disable-next-line no-unused-vars
    function ([newPage, newLimit, newFilter], oldValue, onCleanup) {
      onCleanup(function () {
        console.log("clean");
        if (t) {
          clearTimeout(t);
        }
      });

      t = setTimeout(() => {
        store.dispatch("handleLoadProducts", {
          limit: newLimit,
          page: newPage,
          filter: newFilter,
        });
      }, 1000);

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
