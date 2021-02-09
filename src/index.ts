import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./graphql";
import { graphqlUploadExpress } from "graphql-upload";
import config from "./config";
const app = express();
app.use(cors());
app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));

const server = new ApolloServer({
  playground: true,
  introspection: true,
  uploads:false,
  schema,
  context: ({ req }) => {
    // Get the user token from the headers.
    const token = req.headers.authorization || "";

    // try to retrieve a user with the token
    // const user = getUser(token);

    // add the user to the context
    return { token };
  },
});

server.applyMiddleware({ app });
app.use(express.static("public"));
app.listen(config.port, () => {
  console.log(`server on port ${config.port}`);
});
