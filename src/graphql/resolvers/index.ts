import { mergeResolvers } from "graphql-tools";
import helloResolvers from "./userResolvers";

const resolvers = [helloResolvers];

export default mergeResolvers(resolvers);
