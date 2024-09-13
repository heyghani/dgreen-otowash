import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Fetch all orders
export async function GET() {
  try {
    const orders = await prisma.order.findMany();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// Create a new order
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newOrder = await prisma.order.create({
      data: {
        customerName: body.customerName,
        item: body.item,
        quantity: body.quantity,
        price: body.price,
      },
    });
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
