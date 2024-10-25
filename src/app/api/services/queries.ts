import { IService } from "@/libs/interfaces/order";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const getAllServicesQuery = async () => {
  try {
    const services = await prisma.service.findMany();
    return services;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
};

export const createServicesQuery = async (data: IService) => {
  try {
    return prisma.service.create({
      data: {
        serviceName: data.serviceName,
        price: parseFloat(data.price.toString()),
      },
    });
  } catch (error) {
    throw error;
  }
};

export const updateServicesQuery = async (data: IService, id: string) => {
  try {
    return await prisma.service.update({
      where: { id: parseInt(id) },
      data: {
        serviceName: data.serviceName,
        price: parseFloat(data.price.toString()),
      },
    });
  } catch (error) {
    throw error;
  }
};

export const deleteServicesQuery = async (id: string) => {
  try {
    return await prisma.service.delete({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    throw error;
  }
};
