<template>
  <div @click="$router.push('/blogs/' + post.id)" class="post">
    <div class="post__img">
      <img :src="post.feature_image" alt="" />
    </div>
    <div class="post__title"><span>Title</span>{{ post.title }}</div>
    <div class="post__tags"><span>Tags</span>{{ post.tags.name }}</div>
    <div class="post__authors"><span>Author</span>{{ post.authors }}</div>
    <div class="post__excerpt">{{ post.excerpt }}</div>
  </div>
</template>

<script>
import "./index.scss";

export default {
  props: {
    post: {
      id: String,
      uuid: String,
      title: String,
      slug: String,
      html: String,
      feature_image: String,
      visibility: String,
      created_at: String,
      updated_at: String,
      tags: {
        id: String,
        name: String,
        slug: String,
      },
      authors: String,
      excerpt: String,
    },
  },
};
</script>