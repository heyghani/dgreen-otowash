import React from "react";

interface ReceiptProps {
  customerName: string;
  service: string;
  price: number;
}

const Receipt = ({ customerName, service, price }: ReceiptProps) => {
  return (
    <div id="receipt">
      <h1>Carwash Receipt</h1>
      <p>Customer Name: {customerName}</p>
      <p>Service: {service}</p>
      <p>Price: ${price}</p>
    </div>
  );
};

export default Receipt;
