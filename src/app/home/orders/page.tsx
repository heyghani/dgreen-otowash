"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { IOrder } from "@/libs/interfaces/order";
import { Plus } from "@phosphor-icons/react";
import { Button } from "@mui/material";
import TableOrder from "@/components/pages/order/tableOrder";
import FormOrder from "@/components/pages/order/formOrder";

export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [editingOrder, setEditingOrder] = useState<IOrder | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { register, handleSubmit, reset } = useForm<IOrder>();

  const fetchOrders = async () => {
    try {
      const response = await axios.get<IOrder[]>("/api/orders");
      setOrders(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const onSubmit = async (data: IOrder) => {
    if (editingOrder) {
      await axios.put(`/api/orders/${editingOrder.id}`, data);
      setEditingOrder(null);
    } else {
      await axios.post("/api/orders", data);
    }
    fetchOrders();
    reset();
  };

  // Edit Order
  const handleEdit = (order: IOrder) => {
    setEditingOrder(order);
    reset(order);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`/api/orders/${id}`);
    fetchOrders();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="container-card">
        <Button
          color="primary"
          variant="contained"
          startIcon={<Plus />}
          onClick={() => setShowModal(true)}
        >
          New
        </Button>
        <FormOrder open={showModal} onClose={handleCloseModal} />

        <TableOrder
          data={orders}
          isLoading={false}
          totalData={orders.length}
          page={1}
          totalPage={10}
        />
      </div>
    </div>
  );
}
