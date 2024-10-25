import { NextResponse } from "next/server";
import {
  createOrderQuery,
  getAllOrderQuery,
  updateOrderQuery,
} from "./queries";
import { IOrder } from "@/libs/interfaces/order";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const orders = await getAllOrderQuery();
    return NextResponse.json({ data: orders });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const {
      startTime,
      finishTime,
      unitNumber,
      unitName,
      customerName,
      address,
      phoneNumber,
      items,
      services,
      addOns,
      discount,
      totalPaid,
    } = await req.json();

    const dataOrder: IOrder = {
      startTime,
      finishTime,
      unitName,
      unitNumber,
      customerName,
      address,
      phoneNumber,
      items,
      services,
      addOns,
      discount,
      totalPaid,
    };

    const newOrder = await createOrderQuery(dataOrder);

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const {
      id,
      startTime,
      finishTime,
      unitNumber,
      unitName,
      customerName,
      address,
      phoneNumber,
      items,
      services,
      addOns,
      discount,
      totalPaid,
    } = await req.json();

    const dataOrder: IOrder = {
      startTime,
      finishTime,
      unitName,
      unitNumber,
      customerName,
      address,
      phoneNumber,
      items,
      services,
      addOns,
      discount,
      totalPaid,
    };

    const updatedOrder = await updateOrderQuery(id, dataOrder);

    return NextResponse.json(updatedOrder, { status: 200 });
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
