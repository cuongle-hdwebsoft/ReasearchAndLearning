import ProductApi from "@/service/products";

/* eslint-disable */
export default {
  state: function () {
    return {
      products: [],
      total: 0,
      count: 0,
    };
  },
  mutations: {
    increase: function (state, payload) {
      state.count++;
    },
  },
  actions: {
    handleLoadProducts: async function ({ state }, payload) {
      const { data, isError, total } = await ProductApi.getAll({
        _limit: payload.limit,
        _page: payload.page,
      });

      if (isError) {
        return;
      }

      state.total = total;
      state.products = data;
    },
  },
};
