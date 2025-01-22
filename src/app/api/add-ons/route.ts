import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const addOns = await prisma.addOn.findMany();
    return NextResponse.json({ data: addOns });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch addOns" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { addOnName, price } = await req.json();

    const newAddOn = await prisma.addOn.create({
      data: {
        addOnName,
        price,
      },
    });
    return NextResponse.json({ data: newAddOn }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create add-on" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, addOnName, price } = await req.json();

    const updatedAddOn = await prisma.addOn.update({
      where: { id },
      data: {
        addOnName,
        price,
      },
    });
    return NextResponse.json({ data: updatedAddOn });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update add-on" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.addOn.delete({ where: { id } });
    return NextResponse.json({ message: "Add-on deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete add-on" },
      { status: 500 }
    );
  }
}
