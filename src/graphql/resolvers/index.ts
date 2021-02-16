import { mergeResolvers } from "graphql-tools";
import userResolvers from "./userResolvers";
import houseResolvers from "./houseResolvers";
import tenantResolvers from "./tenantResolvers";
import paymentResolvers from "./paymentResolvers";

const resolvers = [
  userResolvers,
  houseResolvers,
  tenantResolvers,
  paymentResolvers,
];

export default mergeResolvers(resolvers);
