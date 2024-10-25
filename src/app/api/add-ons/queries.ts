import { IAddOn } from "@/libs/interfaces/order";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const getAllAddOnsQuery = async () => {
  try {
    const addOns = await prisma.addOn.findMany();
    return addOns;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch addOns" },
      { status: 500 }
    );
  }
};

export const createAddOnsQuery = async (data: IAddOn) => {
  try {
    return await prisma.addOn.create({
      data: {
        addOnName: data.addOnName,
        price: parseFloat(data.price.toString()),
      },
    });
  } catch (error) {
    throw error;
  }
};

export const updateAddOnsQuery = async (data: IAddOn, id: string) => {
  try {
    return await prisma.addOn.update({
      where: { id: parseInt(id) },
      data: {
        addOnName: data.addOnName,
        price: parseFloat(data.price.toString()),
      },
    });
  } catch (error) {
    throw error;
  }
};

export const deleteAddOnsQuery = async (id: string) => {
  try {
    return await prisma.addOn.delete({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    throw error;
  }
};
