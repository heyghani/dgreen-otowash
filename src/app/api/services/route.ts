import { NextResponse } from "next/server";
import {
  createServicesQuery,
  deleteServicesQuery,
  getAllServicesQuery,
  updateServicesQuery,
} from "./queries";
import { IService } from "@/libs/interfaces/order";

export async function GET() {
  try {
    const services = await getAllServicesQuery();
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
    const { serviceName, price } = await req.json();
    const data: IService = {
      serviceName,
      price,
    };
    const newService = await createServicesQuery(data);
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, serviceName, price } = await req.json();
    const data: IService = {
      serviceName,
      price,
    };
    const updatedService = updateServicesQuery(data, id);
    return NextResponse.json(updatedService);
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
    await deleteServicesQuery(id);
    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
