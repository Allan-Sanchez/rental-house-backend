import { mergeTypeDefs } from "graphql-tools";
import User from "./User.graphql";
const types = [User];

export default mergeTypeDefs(types);
