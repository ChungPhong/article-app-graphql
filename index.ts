import express, { Express, Request, Response } from "express";
import { connectDatabase } from "./config/database";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";

import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs/index.typeDefs";

const startServer = async () => {
  dotenv.config();
  connectDatabase();

  const app: Express = express();
  const port: number | string = process.env.Port || 3000;

  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app: app,
    path: "/graphql",
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};

startServer();
