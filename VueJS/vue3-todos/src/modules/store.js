import { createStore } from "vuex";

import products from "./products";

const store = createStore({
  modules: {
    products,
  },
});

export default store;
