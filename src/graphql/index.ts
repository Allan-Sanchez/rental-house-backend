import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import "graphql-import-node";
import rootSchema from "./schema";
import resolvers from "./resolvers";
export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: rootSchema,
  resolvers,
});
