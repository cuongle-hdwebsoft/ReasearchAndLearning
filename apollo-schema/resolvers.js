const { find, filter, last } = require("lodash");

// example data
const authors = [
  {
    id: 1,
    firstName: "Tom",
    lastName: "Coleman",
    gender: "MALE",
    friends: ["a", "b", "c"],
  },
  {
    id: 2,
    firstName: "Sashko",
    lastName: "Stubailo",
    gender: "MALE",
    friends: ["a", "c"],
  },
  {
    id: 3,
    firstName: "Mikhail",
    lastName: "Novikov",
    gender: "FEMALE",
    friends: ["c"],
  },
];

const books = [
  { id: 1, authorId: 1, title: "Introduction to GraphQL", votes: 2 },
  { id: 2, authorId: 2, title: "Welcome to Meteor", votes: 3 },
  { id: 3, authorId: 2, title: "Advanced GraphQL", votes: 1 },
  { id: 4, authorId: 3, title: "Launchpad is Cool", votes: 7 },
];

const resolvers = {
  Query: {
    books: (parent, args, context, info) => books,
    authors: (parent, args, context, info) => authors,
    getBookById: (parent, { bookId }) => {
      let rs = find(books, function (o) {
        return o.id == bookId;
      });
      return rs;
    },
    topFavoriteBook: (parent, { n }) => {
      return books.slice(0, n);
    },
  },

  Mutation: {
    createAuthor: (parent, { firstName, lastName, gender }) => {
      console.log(firstName, lastName);
      let rs = {
        firstName,
        lastName,
        gender,
        id: authors.length + 1,
        books: [],
        friends: [],
      };
      authors.push(rs);

      return rs;
    },
  },

  // trong định nghĩa Book chúng ta trả về author là 1 object Author nhưng lúc kết quả trả về  từ database lại là authorId
  // không hề có 1 key nào là author
  // chúng ta sẽ dùng type Resolver để query thêm cái relation này
  // https://www.apollographql.com/docs/apollo-server/data/resolvers/#default-resolvers

  Book: {
    author: (book) => {
      return find(authors, { id: book.authorId });
    },
  },

  // trong định nghĩa Author chúng ta trả về books là 1 array object Books
  // nhưng kết quả trả về từ databse không hề có 1 key nào là books
  // chúng ta sẽ dùng type Resolver để query thêm cái relation này
  // https://www.apollographql.com/docs/apollo-server/data/resolvers/#default-resolvers

  Author: {
    books: function (author) {
      return filter(books, { authorId: author.id });
    },
    friends: function (author, { top }) {
      return author.friends.slice(0, top);
    },
  },
};

module.exports = { resolvers };
