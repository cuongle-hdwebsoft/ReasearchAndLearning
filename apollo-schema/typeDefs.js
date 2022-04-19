module.exports.typeDefs = `
  type Category {
    id: ID!
    name: String
    slug: String
  }

  type Post {
    id: ID!
    uuid: String
    title: String
    slug: String
    html: String
    feature_image: String
    visibility: String
    created_at: String
    updated_at: String
    tags: Category
    authors: String
    excerpt: String
  }

  input IPostBody {
    title: String
    slug: String
    html: String
    feature_image: String
    authors: String
    excerpt: String
  }

  input IFilterPaginationPostParams {
    _limit: Int 
    _page: Int 
    _sort: String 
    _order: String 
    q: String
  }

  input CategoryParam {
    id: ID!
    name: String
    slug: String
  }

  type IPostResult {
    data: [Post!]! 
    total: Int!
  }

  type Query {
    getPosts(params: IFilterPaginationPostParams): IPostResult
  }

  type Mutation {
    createPost(post: IPostBody, tags: CategoryParam): Post
  }
`;
