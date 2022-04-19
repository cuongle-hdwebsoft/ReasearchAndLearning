const { resolvers } = require("./resolvers");
const express = require("express");
const http = require("http");
const { typeDefs } = require("./typeDefs");
const cors = require("cors");

const { ApolloServer } = require("apollo-server-express");

async function startApolloServer() {
  const app = express();
  app.use(cors());
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();
