import { IResolvers } from "graphql-tools";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const houseResolvers: IResolvers = {
  Query: {
    async getHouses() {
      const houses = await prisma.house.findMany({
        include: {
          images: true,
        },
      });
      return houses;
    },
    async getHouse(_: void, arg: any) {
      let { uuid } = arg;
      const house = await prisma.house.findFirst({
        where: { uuid },
        include: {
          images: true,
        },
      });
      return house;
    },
  },
};

export default houseResolvers;
