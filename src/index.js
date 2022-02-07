import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import mongoose from "mongoose";
import express from "express";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

async function startApolloServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await server.start();
  server.applyMiddleware({ app });

  app.use((req, res) => {
    res.send("Hello");
  });
  await mongoose.connect("mongodb://mongodb:27017/test3", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at ${server.graphqlPath}`);
  });
}

startApolloServer();
