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
        where: {
          state: true,
        },
        include: {
          images: true,
        },
      });
      return houses;
    },
    async getHouse(_: void, arg: any) {
      let { uuid } = arg;
      try {
        const house = await prisma.house.findFirst({
          where: { uuid },
          include: {
            images: true,
          },
        });
        return house;
      } catch (error) {
        console.log(error);
      }
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
      const {
        fields,
        fields: { nis },
      } = arg;
      const houseExist = await prisma.house.findFirst({ where: { nis } });
      if (houseExist) {
        throw new Error(
          "House already exist, please see the list of available houses"
        );
      }
      try {
        const house = await prisma.house.create({ data: fields });
        return house;
      } catch (error) {
        console.log(error);
      }
    },

    async updateHouse(_: void, arg: any) {
      const { uuid, fields } = arg;
      const houseExist = await prisma.house.findFirst({ where: { uuid } });
      if (!houseExist) {
        throw new Error("House not exist");
      }
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

    async deleteHouse(_: void, arg: any) {
      const { uuid } = arg;
      const houseExist = await prisma.house.findFirst({ where: { uuid } });
      if (!houseExist) {
        throw new Error("House not exist");
      }
      try {
        await prisma.house.updateMany({
          where: { uuid },
          data: {
            state: false,
          },
        });
        return "House deleted successfully";
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default houseResolvers;
