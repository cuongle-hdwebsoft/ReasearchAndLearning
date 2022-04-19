module.exports.typeDefs = `
  enum GENDER {
    MALE,
    FEMALE
  }

  type Author {
    id: ID!
    firstName: String
    lastName: String
    books: [Book]
    gender: GENDER
    friends(top: Int): [String]
  }

  type Book {
    id: ID!
    title: String
    author: Author
    votes: Int!
  }

  type Query {
    books: [Book]
    authors: [Author]
    getBookById(bookId: ID!): Book
    topFavoriteBook(n: Int!): [Book!]!
  }

  type Mutation {
    createAuthor(firstName: String, lastName: String, gender: GENDER): Author
  }
`;
