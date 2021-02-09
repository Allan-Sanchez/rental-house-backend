import { IResolvers } from "graphql-tools";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";
import config from "../../config";
import { v4 as uuidv4 } from "uuid";
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
  Mutation: {
    async uploadFile(_: void, args: any) {
      const { file } = args;
      const { createReadStream, filename } = await file.file;
      let nameImage = `${uuidv4()}-${filename}`;
      const stream = createReadStream();
      const pathName = path.join(
        __dirname,
        `../../../public/images/${nameImage}`
      );
      await stream.pipe(fs.createWriteStream(pathName));
      return {
        url: `${config.baseUrl}images/${nameImage}`,
      };
    },

    async newHouse(_: void, arg: any) {
      const { fields } = arg;
      try {
        const house = await prisma.house.create({ data: fields });
        return house;
      } catch (error) {
        console.log(error);
      }
    },

    async updateHouse(_: void, arg: any) {
      const { uuid, fields } = arg;
      try {
        await prisma.house.updateMany({
          where: {
            uuid,
          },
          data: fields,
        });

        return await prisma.house.findFirst({ where: { uuid } });
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default houseResolvers;
