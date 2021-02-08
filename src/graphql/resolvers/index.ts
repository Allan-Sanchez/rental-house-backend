import { mergeResolvers } from "graphql-tools";
import userResolvers from "./userResolvers";
import houseResolvers from "./houseResolvers";

const resolvers = [userResolvers,houseResolvers];

export default mergeResolvers(resolvers);
