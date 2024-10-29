"use client";
import { IAddOn, IOrder, IService } from "@/libs/interfaces/order";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Grid2 as Grid,
} from "@mui/material";
import React, { useState } from "react";

interface FormOrderProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: IOrder) => void; // Function to handle form submission
}

const FormOrder: React.FC<FormOrderProps> = ({ open, onClose, onSubmit }) => {
  // Local state for form inputs
  const [startTime, setStartTime] = useState<string>("");
  const [finishTime, setFinishTime] = useState<string>("");
  const [unitNumber, setUnitNumber] = useState<string>("");
  const [unitName, setUnitName] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [items, setItems] = useState<string[]>([""]); // Initialize with one empty item
  const [services, setServices] = useState<IService[]>([]); // Placeholder for selected services
  const [addOns, setAddOns] = useState<IAddOn[]>([]); // Placeholder for selected add-ons
  const [discount, setDiscount] = useState<number>(0);

  const handleSubmit = () => {
    // Prepare data for submission
    const orderData: IOrder = {
      startTime,
      finishTime,
      unitNumber,
      unitName,
      customerName,
      address,
      phoneNumber,
      items,
      services, // Fill this with the selected services
      addOns, // Fill this with the selected add-ons
      discount,
      totalPaid: 0, // You might want to calculate this based on your logic
      totalItems: items.length,
      totalChanges: 0, // Set according to your business logic
    };

    // Call the onSubmit prop to handle the submission
    onSubmit(orderData);
    onClose(); // Close the dialog after submission
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="md">
        <DialogTitle>Add New Order</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Start Time"
                  type="datetime-local"
                  fullWidth
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Finish Time"
                  type="datetime-local"
                  fullWidth
                  value={finishTime}
                  onChange={(e) => setFinishTime(e.target.value)}
                  required
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Unit Number"
                  fullWidth
                  value={unitNumber}
                  onChange={(e) => setUnitNumber(e.target.value)}
                  required
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Unit Name"
                  fullWidth
                  value={unitName}
                  onChange={(e) => setUnitName(e.target.value)}
                  required
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Customer Name"
                  fullWidth
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Address"
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Discount"
                  type="number"
                  fullWidth
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                />
              </Grid>
              {/* You might want to add fields for items, services, and add-ons here */}
              {/* For items, you can use a loop to generate input fields based on the current state */}
              {items.map((item, index) => (
                <Grid size={{ xs: 6 }} key={index}>
                  <TextField
                    label={`Item ${index + 1}`}
                    fullWidth
                    value={item}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[index] = e.target.value;
                      setItems(newItems);
                    }}
                  />
                </Grid>
              ))}
              <Grid size={{ xs: 6 }}>
                <Button
                  onClick={() => setItems([...items, ""])} // Add a new item input field
                  variant="outlined"
                >
                  Add Item
                </Button>
              </Grid>
              {/* You can implement similar logic for services and add-ons */}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default FormOrder;
