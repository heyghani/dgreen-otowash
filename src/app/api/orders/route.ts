import { NextResponse } from "next/server";
import Order from "@/models/order";

// GET request to fetch orders
export async function GET() {
  const orders = await Order.findAll();

  return NextResponse.json(orders);
}

// POST request to create a new order
// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   const newOrder = { id: Date.now(), ...body };
//   orders.push(newOrder);
//   return NextResponse.json(newOrder, { status: 201 });
// }

// // PUT request to update an order
// export async function PUT(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const id = Number(searchParams.get("id"));
//   const body = await req.json();

//   orders = orders.map((order) =>
//     order.id === id ? { ...order, ...body } : order
//   );

//   return NextResponse.json({ message: "Order updated" });
// }

// // DELETE request to delete an order
// export async function DELETE(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const id = Number(searchParams.get("id"));

//   orders = orders.filter((order) => order.id !== id);

//   return NextResponse.json({ message: "Order deleted" });
// }
