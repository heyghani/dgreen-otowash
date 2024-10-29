import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { calculateTotalPayment } from "@/utils/calculateTotalPayment";
import {
  IOrderAddOn,
  IOrderItem,
  IOrderService,
} from "@/libs/interfaces/order";
import { generateReceiptNumber } from "@/utils/generateReceiptNumber";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        services: {
          select: {
            service: {
              select: {
                serviceName: true,
              },
            },
            serviceType: {
              select: {
                serviceType: true,
                price: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json({ data: orders });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const {
      customerName,
      unitNumber,
      unitName,
      address,
      phoneNumber,
      items,
      services,
    } = await req.json();

    const receiptNumber = generateReceiptNumber();

    const order = await prisma.order.create({
      data: {
        receiptNumber,
        customerName,
        unitNumber,
        unitName,
        address,
        phoneNumber,
        items: {
          create: items?.map((val: IOrderItem) => ({
            itemName: val,
          })),
        },
        startTime: new Date(),
        services: {
          create: services?.map((service: IOrderService) => ({
            service: { connect: { id: service.serviceId } },
            serviceType: { connect: { id: service.serviceTypeId } },
          })),
        },
        status: "in_progress",
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, services, addOns, discount, totalPaid } = await req.json();

    const updatedTotalPayment = calculateTotalPayment({
      services: services || [],
      addOns: addOns || [],
      discount: discount || 0,
    });

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        finishTime: new Date(),
        services: {
          create: services?.map((service: IOrderService) => ({
            service: { connect: { id: service.serviceId } },
            serviceType: { connect: { id: service.serviceTypeId } },
          })),
        },
        addOns: {
          create: addOns.map((addOn: IOrderAddOn) => ({
            addOn: {
              connect: { id: addOn.id },
            },
            quantity: addOn.quantity,
            totalPrice: addOn.quantity * addOn.totalPrice,
          })),
        },
        discount,
        totalPaid,
        status: "completed",
        totalPayment: updatedTotalPayment,
        totalItems: {
          set: addOns.length + services.length,
        },
        totalChanges: totalPaid - updatedTotalPayment,
      },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.order.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Order deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 }
    );
  }
}
