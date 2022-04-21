Vue.component("blog-post", {
  props: ["post"],
  template: `
    <div class='post'>
      <span class='post__title'>{{ post.title }}</span>
      <span class='post__author'>{{ post.author }}</span>
      <span class='post__description'>{{ post.description }}</span>
      <button @click="$emit('alert-post', post.id)">click</button>
      <button @click="post.title = '123123123'">click</button>

      <some-where-on-earth></some-where-on-earth>
    </div>
  `,
  updated: function () {
    console.log("blog-post updated");
  },
  mounted: function () {
    // console.log(this);
  },
});
