import { NextResponse } from "next/server";
import {
  createAddOnsQuery,
  deleteAddOnsQuery,
  getAllAddOnsQuery,
  updateAddOnsQuery,
} from "./queries";
import { IAddOn } from "@/libs/interfaces/order";

export async function GET() {
  try {
    const addOns = await getAllAddOnsQuery();
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
    const data: IAddOn = {
      addOnName,
      price,
    };
    const newAddOn = await createAddOnsQuery(data);
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
    const data: IAddOn = {
      addOnName,
      price,
    };
    const updatedAddOn = await updateAddOnsQuery(data, id);
    return NextResponse.json(updatedAddOn);
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
    await deleteAddOnsQuery(id);
    return NextResponse.json({ message: "Add-on deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete add-on" },
      { status: 500 }
    );
  }
}
