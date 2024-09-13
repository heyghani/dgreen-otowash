"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Layout from "@/components/Layout";

// Define Order Type
interface Order {
  id: number;
  customerName: string;
  item: string;
  quantity: number;
  price: number;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const { register, handleSubmit, reset } = useForm<Order>();

  // Fetch orders from an API (mock API here)
  const fetchOrders = async () => {
    const response = await axios.get("/api/orders");
    setOrders(response);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Create or Update Order
  const onSubmit = async (data: Order) => {
    if (editingOrder) {
      // Update
      await axios.put(`/api/orders/${editingOrder.id}`, data);
      setEditingOrder(null);
    } else {
      // Create
      await axios.post("/api/orders", data);
    }
    fetchOrders();
    reset();
  };

  // Edit Order
  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    reset(order); // Pre-fill form with the selected order
  };

  // Delete Order
  const handleDelete = async (id: number) => {
    await axios.delete(`/api/orders/${id}`);
    fetchOrders();
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Orders</h1>

        {/* Order Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Customer Name"
              {...register("customerName", { required: true })}
              className="border p-2 w-full"
            />
            <input
              type="text"
              placeholder="Item"
              {...register("item", { required: true })}
              className="border p-2 w-full"
            />
            <input
              type="number"
              placeholder="Quantity"
              {...register("quantity", { required: true })}
              className="border p-2 w-full"
            />
            <input
              type="number"
              placeholder="Price"
              {...register("price", { required: true })}
              className="border p-2 w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            {editingOrder ? "Update Order" : "Create Order"}
          </button>
        </form>

        {/* Order Table */}
        <table className="min-w-full mt-6 bg-white">
          <thead>
            <tr>
              <th className="px-6 py-2">Customer Name</th>
              <th className="px-6 py-2">Item</th>
              <th className="px-6 py-2">Quantity</th>
              <th className="px-6 py-2">Price</th>
              <th className="px-6 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-6 py-2">{order.customerName}</td>
                <td className="px-6 py-2">{order.item}</td>
                <td className="px-6 py-2">{order.quantity}</td>
                <td className="px-6 py-2">{order.price}</td>
                <td className="px-6 py-2">
                  <button
                    onClick={() => handleEdit(order)}
                    className="bg-yellow-500 text-white px-4 py-1 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="bg-red-500 text-white px-4 py-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
