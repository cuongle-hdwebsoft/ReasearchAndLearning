import { parse } from "query-string";
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";

export function useGetProductFilter() {
  const store = useStore();
  const limit = computed({
    get() {
      return store.state.products.limit;
    },
    set(newValue) {
      store.dispatch("handleChangeLimit", newValue);
    },
  });
  const page = computed({
    get() {
      return store.state.products.page;
    },
    set(newValue) {
      store.dispatch("handleChangePage", newValue);
    },
  });
  const filterQ = computed({
    get() {
      return store.state.products.filter.q;
    },
    set(newValue) {
      store.dispatch("handleChangeFilterQ", newValue);
      page.value = 1;
    },
  });
  const filterCategoryName = computed({
    get() {
      return store.state.products.filter.categoryName;
    },
    set(newValue) {
      store.dispatch("handleChangeFilterCategoryName", newValue);
      page.value = 1;
    },
  });
  const filter = computed(() => store.state.products.filter);

  onBeforeMount(function () {
    const query = parse(window.location.href.split("/#")[1]);

    if (query.limit) {
      limit.value = parseInt(query.limit);
    }

    if (query.page) {
      page.value = parseInt(query.page);
    }

    if (query.q) {
      filterQ.value = query.q;
    }

    if (query.categoryName) {
      filterCategoryName.value = query.categoryName;
    }
  });

  const handleClearFilter = function () {
    filterQ.value = "";
    filterCategoryName.value = "";
    page.value = 1;
    limit.value = 8;
  };

  return {
    filterQ,
    filterCategoryName,
    filter,
    limit,
    page,
    handleClearFilter,
  };
}
