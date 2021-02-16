import { IResolvers } from "graphql-tools";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const paymentResolvers: IResolvers = {
  Query: {
    async getPayments() {
      try {
        const payments = await prisma.payment.findMany({
          include: {
            tenant: true,
            house: true,
          },
        });
        return payments;
      } catch (error) {
        console.log(error);
      }
    },
    async getPayment(_: void, arg: any) {
      const { uuid } = arg;
      const PaymentExist = await prisma.payment.findFirst({ where: { uuid } });
      if (!PaymentExist) {
        throw new Error("Payment not found");
      }
      try {
        const payment = await prisma.payment.findFirst({
          where: { uuid },
          include: {
            tenant: true,
            house: true,
          },
        });
        return payment;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    async newPayment(_: void, arg: any) {
      const { fields } = arg;
      try {
        const paymentAdded = await prisma.payment.create({
          data: fields,
        });
        return paymentAdded;
      } catch (error) {
        console.log(error);
      }
    },
    async updatePayment(_: void, arg: any) {
      const { uuid, fields } = arg;
      const PaymentExist = await prisma.payment.findFirst({ where: { uuid } });
      if (!PaymentExist) {
        throw new Error("Payment not found");
      }
      try {
        await prisma.payment.updateMany({ where: { uuid }, data: fields });
        return prisma.payment.findFirst({ where: { uuid } });
      } catch (error) {
        console.log(error);
      }
    },
    async deletePayment(_: void, arg: any) {
      const { uuid } = arg;
      const PaymentExist = await prisma.payment.findFirst({ where: { uuid } });
      if (!PaymentExist) {
        throw new Error("Payment not found");
      }
      try {
        await prisma.payment.deleteMany({ where: { uuid } });
        return "Delete Payment SUccessfully";
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default paymentResolvers;
