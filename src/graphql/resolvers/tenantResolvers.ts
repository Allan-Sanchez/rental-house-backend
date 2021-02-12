import { IResolvers } from "graphql-tools";
import { PrismaClient } from "@prisma/client";
import { EROFS } from "constants";
const prisma = new PrismaClient();

const tenantResolvers: IResolvers = {
  Query: {
    async getTenants() {
      try {
        const tenants = await prisma.tenant.findMany({
          where: { state: true },
          include: {
            payments: true,
          },
        });
        return tenants;
      } catch (error) {
        console.log(error);
      }
    },
    async getTenant(_: void, arg: any) {
      const { uuid } = arg;
      try {
        const tenant = await prisma.tenant.findFirst({
          where: { uuid },
        });
        return tenant;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    async newTenant(_: void, arg: any) {
      const {
        fields,
        fields: { dpi },
      } = arg;

      const tenantExist = await prisma.tenant.findFirst({
        where: { dpi },
      });
      if (tenantExist) {
        throw new Error("Tenant already exist");
      }

      try {
        const TenantAdded = await prisma.tenant.create({
          data: fields,
        });
        return TenantAdded;
      } catch (error) {
        console.log(error);
      }
    },
    async updateTenant(_: void, arg: any) {
      const { uuid, fields } = arg;
      const tenantExist = await prisma.tenant.findFirst({
        where: { uuid },
      });
      if (!tenantExist) {
        throw new Error("tenant no exist");
      }
      try {
        await prisma.tenant.updateMany({
          where: { uuid },
          data: fields,
        });
        return await prisma.tenant.findFirst({ where: { uuid } });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTenant(_: void, arg: any) {
      const { uuid } = arg;
      const tenantExist = await prisma.tenant.findFirst({
        where: { uuid },
      });
      if (!tenantExist) {
        throw new Error("Tenant not exist");
      }
      try {
        await prisma.tenant.updateMany({
          where: { uuid },
          data: { state: false },
        });
        return "Tenant Deleted successfully";
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default tenantResolvers;
