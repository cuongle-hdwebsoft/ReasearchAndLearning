<template>
  <div class="filter-bar">
    <input
      @keyup="handleChangeInput('q', $event)"
      style="margin-right: 5px"
      class="filter-bar__search-input"
      type="text"
      placeholder="search post..."
    />

    <select
      @change="handleChangeInput('tags.id', $event)"
      style="margin-right: 5px"
      class="filter-bar__search-categories"
    >
      <option value="">All</option>
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>

    <!-- <select style="margin-right: 5px" class="filter-bar__sort">
      <option value="q-asc">Name ascending</option>
      <option value="q-desc">Name descending</option>
      <option value="tags.name-asc">Tag ascending</option>
      <option value="tags.name-asc">Tag descending</option>
    </select> -->

    Founded item: {{ total }} (items)
  </div>
</template>

<script>
import CategoryApi from "@/service/categories";

export default {
  props: {
    total: Number,
  },
  data: function () {
    return {
      categories: [],
      filter: {},
    };
  },
  methods: {
    getCategories: async function () {
      const { data } = await CategoryApi.getCategories();
      this.categories = data;
    },
    handleChangeInput: function (key, event) {
      this.filter = {
        ...this.filter,
        [key]: event.target.value,
      };

      this.$emit("getFilters", this.filter);
    },
    handleSort: function () {},
  },
  mounted: function () {
    this.getCategories();
  },
};
</script>