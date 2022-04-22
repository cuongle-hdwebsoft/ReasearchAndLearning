<template>
  <div class="post-detail">
    <div v-if="post">
      <h1>
        {{ post.title }}
        <button @click="$router.push('/blogs/' + $route.params.id + '/edit')">
          Edit this post now
        </button>
      </h1>

      <div v-html="post.html"></div>
    </div>
  </div>
</template>

<script>
import PostApi from "@/service/posts";
export default {
  data: function () {
    return {
      post: null,
    };
  },
  methods: {
    getPost: async function () {
      const { data } = await PostApi.getPostById(
        this.$router.currentRoute.params.id
      );
      this.post = data;
    },
  },
  mounted: function () {
    this.getPost();
  },
};
</script>

<style>
.post-detail img {
  width: 350px;
  height: 300px;
  display: block;
  margin: auto;
}
</style>