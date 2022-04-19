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
    createPost: async function (parent, { post, tags }) {
      let rs = await PostApi.createPost({
        ...post,
        tags: tags,
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
