"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { IOrder } from "@/libs/interfaces/order";
import { Plus } from "@phosphor-icons/react";
import { Button } from "@mui/material";
import TableOrder from "@/components/pages/order/tableOrder";
import FormOrder from "@/components/pages/order/formOrder";
import FormEditOrder from "@/components/pages/order/formEditOrder";
import TableSearch from "@/components/table/search";

export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [orderDetails, setOrderDetails] = useState<IOrder | null>(null);
  const [editingOrder, setEditingOrder] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/orders");
      if (response.status == 200) {
        setIsLoading(false);
        setOrders(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchServices = async () => {
    try {
      const response = await axios.get("/api/services");
      return response.data.data;
    } catch (err) {
      console.log(err);
    }
  };
  const fetchAddOns = async () => {
    try {
      const response = await axios.get("/api/add-ons");
      return response.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  const onEdit = async (id: number) => {
    setIsLoading(true);
    setEditingOrder(true);
    try {
      const response = await axios.get(`/api/orders/${id}`);
      if (response.status == 200) {
        setIsLoading(false);
        setOrderDetails(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: IOrder) => {
    console.log(data);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`/api/orders/${id}`);
    fetchOrders();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingOrder(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="container-card">
        <div className="flex flex-row items-center justify-between">
          <Button
            color="primary"
            variant="contained"
            startIcon={<Plus />}
            onClick={() => setShowModal(true)}
          >
            New
          </Button>
          <TableSearch />
        </div>
        <FormOrder
          open={showModal}
          onClose={handleCloseModal}
          fetchServices={fetchServices}
          fetchAddOns={fetchAddOns}
          onSubmit={onSubmit}
        />

        <FormEditOrder
          open={editingOrder}
          onClose={handleCloseModal}
          fetchServices={fetchServices}
          fetchAddOns={fetchAddOns}
          orderDetails={orderDetails}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />

        <TableOrder
          data={orders}
          onClickEdit={onEdit}
          isLoading={isLoading}
          totalData={orders.length}
          page={1}
          totalPage={10}
        />
      </div>
    </div>
  );
}
