import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { IServiceType } from "@/libs/interfaces/order";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      include: {
        serviceTypes: true,
      },
    });
    return NextResponse.json({ data: services });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { serviceName, serviceType } = await req.json();
    const newService = await prisma.service.create({
      data: {
        serviceName,
        serviceTypes: {
          create: serviceType?.map((type: IServiceType) => ({
            serviceType: type.serviceType,
            price: type.price,
          })),
        },
      },
    });
    return NextResponse.json({ data: newService }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, serviceName, serviceType } = await req.json();

    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        serviceName,
        serviceTypes: {
          deleteMany: {},
          create: serviceType?.map((type: IServiceType) => ({
            serviceType: type.serviceType,
            price: type.price,
          })),
        },
      },
    });
    return NextResponse.json({ data: updatedService });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

// Delete a service
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.service.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
