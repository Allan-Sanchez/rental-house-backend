import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./graphql";
import config from "./config";
const app = express();
app.use(cors());

const server = new ApolloServer({
  playground: true,
  introspection: true,
  schema,
});

server.applyMiddleware({ app });
app.listen(config.port, () => {
  console.log(`server on port ${config.port}`);
});
