import { mergeTypeDefs } from "graphql-tools";
import User from "./User.graphql";
import House from "./House.graphql";
import Tenant from "./Tenant.graphql";
import Payment from "./Payment.graphql";
const types = [User,House,Tenant,Payment];

export default mergeTypeDefs(types);
