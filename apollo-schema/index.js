const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const httpServer = http.createServer(app);

const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");
const { ApolloServer } = require("apollo-server-express");

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .start()
  .then(() => {
    server.applyMiddleware({ app });
    return new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  })
  .then(() => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });
