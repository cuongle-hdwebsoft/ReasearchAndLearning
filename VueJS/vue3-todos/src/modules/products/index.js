import ProductApi from "@/service/products";

/* eslint-disable */
export default {
  state: function () {
    return {
      products: [],
      total: 0,
      isLoadingProducts: false,
      filter: {
        q: "",
        categoryName: "",
      },
      limit: 8,
      page: 1,
    };
  },
  mutations: {
    increase: function (state, payload) {
      state.count++;
    },
  },
  actions: {
    handleLoadProducts: async function ({ state }, { limit, page, filter }) {
      state.isLoadingProducts = true;

      const { data, isError, total, error } = await ProductApi.getAll({
        _limit: limit,
        _page: page,
        filter: filter,
      });

      if (isError) {
        state.isLoadingProducts = false;
        return;
      }

      state.total = parseInt(total);
      state.products = data;
      state.isLoadingProducts = false;
    },
    handleChangeFilterQ: function ({ state }, payload) {
      state.filter.q = payload;
    },
    handleChangeFilterCategoryName: function ({ state }, payload) {
      state.filter.categoryName = payload;
    },
    handleChangePage: function ({ state }, payload) {
      state.page = payload;
    },
    handleChangeLimit: function ({ state }, payload) {
      state.limit = payload;
    },
  },
};
