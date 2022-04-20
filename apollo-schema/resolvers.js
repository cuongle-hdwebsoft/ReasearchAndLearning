const PostApi = require("./services/posts");
const { v4 } = require("uuid");

const resolvers = {
  Query: {
    getPosts: async function (parent, { params = {} }) {
      let rs = await PostApi.getAll(params);
      return rs;
    },
  },
  Mutation: {
    createPost: async function (parent, { post }) {
      console.log(post);
      let rs = await PostApi.createPost({
        ...post,
        tags: {
          id: "59799bbd6ebb2f00243a33db",
          name: "Getting Started",
          slug: "Getting Started",
        },
        uuid: v4(),
        visibility: "true",
        created_at: new Date().toUTCString().toString(),
        updated_at: new Date().toUTCString().toString(),
      });

      console.log(rs);

      return rs;
    },
  },
};

module.exports = { resolvers };
