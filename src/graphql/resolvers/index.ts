import { mergeResolvers } from "graphql-tools";
import userResolvers from "./userResolvers";
import houseResolvers from "./houseResolvers";
import tenantResolvers from "./tenantResolvers";

const resolvers = [userResolvers,houseResolvers,tenantResolvers];

export default mergeResolvers(resolvers);
