<template>
  <div>
    <h1>Blog page</h1>
    <SearchFilterBar
      :total="total"
      @getFilters="filter = $event"
      @removeFilter="handleRemoveFilter"
    ></SearchFilterBar>
    <div class="row">
      <div v-for="post in posts" :key="post.id" class="col-3">
        <PostItem :post="post"></PostItem>
      </div>
    </div>
    <div class="d-flex justify-flex-end">
      <PaginationList
        :count="total"
        :limit="limit"
        :page="page"
        :rowPerPages="[1, 2, 4, 8]"
        @changePage="handleChangePage($event)"
        @rowPerPageChange="handleChangeLimit($event)"
      ></PaginationList>
    </div>
  </div>
</template>

<script>
import PostApi from "../service/posts";
import PostItem from "../modules/post/components/PostItem/PostItem.vue";
import PaginationList from "../components/pagination/PaginationList.vue";
import SearchFilterBar from "../modules/post/components/FilterBar/SearchFilterBar.vue";
import queryString from "query-string";

export default {
  components: {
    PostItem,
    PaginationList,
    SearchFilterBar,
  },
  data: function () {
    return {
      posts: [],
      limit: 8,
      page: 1,
      total: 0,
      filter: {},
    };
  },
  methods: {
    getPosts: async function () {
      const { data, total } = await PostApi.getPosts({
        _limit: this.limit,
        _page: this.page,
        filter: this.filter,
      });

      this.posts = data;
      this.total = total;
    },
    handleChangePage(page) {
      this.page = page;
    },
    handleChangeLimit(limit) {
      this.limit = limit;
      this.page = 1;
    },
    handleRemoveFilter() {
      this.limit = 8;
      this.page = 1;
      this.filter = {};
    },
  },
  mounted: function () {
    this.getPosts();

    this.$watch(
      (v) => {
        return [v.limit, v.page, v.filter];
      },
      function () {
        this.getPosts();

        let newUrl = queryString.stringifyUrl({
          url: window.location.pathname,
          query: {
            limit: this.limit,
            page: this.page,
            ...this.filter,
          },
        });
        window.history.pushState({}, null, newUrl);
      },
      {
        deep: true,
        immediate: false,
      }
    );
  },
};
</script>