"use client";
import React, { useState } from "react";

const OrderForm = () => {
  const [orderDetails, setOrderDetails] = useState({
    customerName: "",
    service: "",
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderDetails({
      ...orderDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger receipt printing
    window.print();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="customerName"
        placeholder="Customer Name"
        value={orderDetails.customerName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="service"
        placeholder="Service"
        value={orderDetails.service}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={orderDetails.price}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit Order</button>
    </form>
  );
};

export default OrderForm;
