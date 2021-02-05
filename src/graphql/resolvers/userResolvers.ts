import { IResolvers } from "graphql-tools";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const userResolvers: IResolvers = {
  Query: {
    hello() {
      return "test";
    },
  },
  Mutation: {
    async newUser(_: void, arg: any) {
      const { fields } = arg;
      try {
        const user = await prisma.user.create({
          data: fields,
        });
        return user;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default userResolvers;
