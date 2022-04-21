<template>
  <div class="pagination">
    <div
      v-for="value in totalPage"
      :key="'pagination-item' + value"
      :class="['pagination__item', { active: value === page ? true : false }]"
      @click="handleClickPagination(value)"
    >
      {{ value }}
    </div>
    <select @change="handleChangeRowPerPage" class="pagination__select">
      <option
        v-for="value in rowPerPages"
        :key="value"
        :selected="limit === value"
        :title="'Set limit page = ' + value"
      >
        {{ value }}
      </option>
    </select>
  </div>
</template>

<script>
import "./index.scss";

export default {
  props: ["count", "limit", "page", "rowPerPages"],
  data: function () {
    return {};
  },
  computed: {
    totalPage: function () {
      const _totalPage = Math.ceil(parseInt(this.count) / parseInt(this.limit));

      return _totalPage;
    },
  },
  methods: {
    handleClickPagination(page) {
      this.$emit("changePage", page);
    },
    handleChangeRowPerPage(event) {
      this.$emit("rowPerPageChange", event.target.value);
    },
  },
};
</script>