import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;

  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
      include: {
        services: {
          include: {
            serviceType: {
              select: {
                service: {
                  select: {
                    serviceName: true,
                  },
                },
                serviceType: true,
                price: true,
              },
            },
          },
        },
        addOns: {
          select: {
            addOn: {
              select: {
                addOnName: true,
                price: true,
              },
            },
            quantity: true,
            totalPrice: true,
          },
        },
        items: {
          select: {
            itemName: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ data: order });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch order details" },
      { status: 500 }
    );
  }
}
