import { IOrder, IService, IAddOn } from "@/libs/interfaces/order";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllOrderQuery = async () => {
  try {
    const data = await prisma.order.findMany({
      include: {
        items: true,
        services: true,
        orderAddOns: true,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const createOrderQuery = async (data: IOrder) => {
  try {
    const totalServicePrice = data.services.reduce(
      (sum, service: IService) => sum + service.price,
      0
    );
    const totalAddOnPrice = data.addOns.reduce(
      (sum, addOn: IAddOn) => sum + addOn.price * addOn.quantity!,
      0
    );

    const totalPayment =
      totalServicePrice + totalAddOnPrice - (data.discount || 0);

    return await prisma.order.create({
      data: {
        startTime: new Date(data.startTime),
        finishTime: new Date(data.finishTime),
        unitNumber: data.unitNumber,
        unitName: data.unitName,
        customerName: data.customerName,
        address: data.address,
        phoneNumber: data.phoneNumber,

        services: {
          connect: data.services.map((service: IService) => ({
            id: service.id,
          })),
        },

        orderAddOns: {
          create: data.addOns.map((addOn: IAddOn) => ({
            addOn: { connect: { id: addOn.id } },
            quantity: addOn.quantity,
            totalPrice: addOn.price * addOn.quantity!,
          })),
        },

        totalPayment,
        discount: data.discount,
        totalPaid: data.totalPaid!,
        totalItems: data.items.length,
        totalChanges: data.totalPaid! - totalPayment,
        items: {
          create: data.items.map((itemName) => ({
            itemName: itemName,
          })),
        },
      },
    });
  } catch (error) {
    throw error;
  }
};

export const updateOrderQuery = async (id: number, data: IOrder) => {
  try {
    const totalServicesPrice = data.services.reduce(
      (total, service) => total + service.price,
      0
    );

    const totalAddOnsPrice = data.addOns.reduce(
      (total, addOn) => total + addOn.price * addOn.quantity!,
      0
    );

    const totalPayment =
      totalServicesPrice + totalAddOnsPrice - (data.discount || 0);
    const totalItems = data.items.length;
    const totalChanges = data.totalPaid! - totalPayment;

    return await prisma.order.update({
      where: { id },
      data: {
        startTime: new Date(data.startTime),
        finishTime: new Date(data.finishTime),
        unitNumber: data.unitNumber,
        unitName: data.unitName,
        customerName: data.customerName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        services: {
          deleteMany: {},
          connect: data.services.map((service: IService) => ({
            id: service.id,
          })),
        },
        orderAddOns: {
          deleteMany: {},
          create: data.addOns.map((addOn: IAddOn) => ({
            addOn: { connect: { id: addOn.id } },
            quantity: addOn.quantity,
            totalPrice: addOn.price * addOn.quantity!,
          })),
        },
        totalPayment,
        discount: data.discount,
        totalPaid: data.totalPaid,
        totalItems,
        totalChanges,
        items: {
          deleteMany: {},
          create: data.items.map((itemName) => ({
            itemName: itemName,
          })),
        },
      },
    });
  } catch (error) {
    throw error;
  }
};
