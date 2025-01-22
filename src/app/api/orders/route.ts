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

async function fetchServicesWithPrices(services: IOrderService[]) {
  const serviceTypeIds = services
    .map((service) => service.serviceTypeId)
    .filter((id): id is number => id !== undefined);

  const serviceTypes = await prisma.serviceType.findMany({
    where: { id: { in: serviceTypeIds } },
    select: {
      id: true,
      price: true,
      service: { select: { serviceName: true } }, // Optional for debugging/logging
    },
  });

  return services.map((service) => {
    const serviceType = serviceTypes.find(
      (st) => st.id === service.serviceTypeId
    );
    return {
      ...service,
      price: serviceType?.price || 0, // Assign the fetched price
    };
  });
}

export async function POST(req: Request) {
  const {
    receiptNumber,
    customerDetails,
    items,
    services,
    addOns,
    discount,
    totalPaid,
  } = await req.json();

  try {
    let existingOrder = null;
    let order;

    if (receiptNumber) {
      existingOrder = await prisma.order.findUnique({
        where: { receiptNumber },
      });
    }

    const servicesWithPrices = await fetchServicesWithPrices(services || []);

    const updatedTotalPayment = calculateTotalPayment({
      services: servicesWithPrices,
      addOns: addOns || [],
      discount: discount || 0,
    });

    if (existingOrder) {
      order = await prisma.order.update({
        where: { receiptNumber },
        data: {
          ...customerDetails,
          services: {
            deleteMany: {},
            create: services?.map((service: IOrderService) => ({
              service: { connect: { id: service.serviceId } },
              serviceType: { connect: { id: service.serviceTypeId } },
            })),
          },
          addOns: {
            deleteMany: {},
            create: addOns?.map((addOn: IOrderAddOn) => ({
              addOn: {
                connect: { id: addOn.id },
              },
              quantity: addOn.quantity,
              totalPrice: addOn.quantity * addOn.price,
            })),
          },
          discount,
          totalPaid,
          totalPayment: updatedTotalPayment,
          totalItems: addOns?.length + services?.length,
          totalChanges: totalPaid - updatedTotalPayment,
        },
        include: { services: true, addOns: true },
      });
    } else {
      const newReceiptNumber = generateReceiptNumber();
      order = await prisma.order.create({
        data: {
          receiptNumber: newReceiptNumber,
          ...customerDetails,
          startTime: new Date(),
          status: "in_progress",
          services: {
            create: services?.map((service: IOrderService) => ({
              service: { connect: { id: service.serviceId } },
              serviceType: { connect: { id: service.serviceTypeId } },
            })),
          },
          addOns: {
            create: addOns?.map((addOn: IOrderAddOn) => ({
              addOn: {
                connect: { id: addOn.id },
              },
              quantity: addOn.quantity,
              totalPrice: addOn.quantity * addOn.price,
            })),
          },
          items: {
            create: items?.map((val: IOrderItem) => ({
              itemName: val,
            })),
          },
          discount,
          totalPaid,
          totalPayment: updatedTotalPayment,
          totalItems: addOns?.length + services?.length,
          totalChanges: totalPaid - updatedTotalPayment,
        },
        include: { services: true, addOns: true },
      });
    }

    return NextResponse.json({ data: order }, { status: 201 });
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
    const { id, totalPaid } = await req.json();

    // Fetch the existing order to validate its status and retrieve totals
    const existingOrder = await prisma.order.findUnique({
      where: { id },
      include: { services: true, addOns: true },
    });

    if (!existingOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (existingOrder.status === "completed") {
      return NextResponse.json(
        { error: "Order is already completed" },
        { status: 400 }
      );
    }

    // Calculate the remaining changes
    const totalChanges = totalPaid - (existingOrder.totalPayment || 0);

    // Mark the order as completed
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        finishTime: new Date(),
        status: "completed",
        totalPaid,
        totalChanges,
      },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to complete order" },
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
