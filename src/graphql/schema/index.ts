import { mergeTypeDefs } from "graphql-tools";
import User from "./User.graphql";
import House from "./House.graphql";
const types = [User,House];

export default mergeTypeDefs(types);
