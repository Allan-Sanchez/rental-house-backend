import bcryptjs from "bcryptjs";
import { IResolvers } from "graphql-tools";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const userResolvers: IResolvers = {
  Query: {
    async getUsers() {
      try {
        const users = await prisma.user.findMany();
        return users;
      } catch (error) {
        console.log(error);
      }
    },
    async getUser(_: void, arg: any) {
      const { uuid } = arg;
      try {
        const user = await prisma.user.findFirst({
          where: { uuid },
        });
        return user;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    async newUser(_: void, arg: any) {
      const { fields } = arg;

      var salt = await bcryptjs.genSalt(10);
      fields.password = await bcryptjs.hash("rest", salt);
      try {
        const user = await prisma.user.create({
          data: fields,
        });
        return user;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUser(_: void, arg: any) {
      const { uuid } = arg;
      try {
        await prisma.user.deleteMany({
          where: { uuid },
        });
        return "user deleted successfully";
      } catch (error) {
        console.log(error);
      }
    },
    async updateUser(_: void, arg: any) {
      const { uuid, fields } = arg;
      try {
        await prisma.user.updateMany({
          where: { uuid },
          data:  fields,
        });

        return await prisma.user.findFirst({
          where: { uuid },
        });
      } catch (error) {
        console.log(error);
      }

    },
  },
};

export default userResolvers;
