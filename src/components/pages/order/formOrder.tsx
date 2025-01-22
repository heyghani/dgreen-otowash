"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  MenuItem,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import { IAddOn, IService } from "@/libs/interfaces/order";

interface FormOrderProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  fetchServices: () => Promise<IService[]>;
  fetchAddOns: () => Promise<IAddOn[]>;
}

const FormOrder: React.FC<FormOrderProps> = ({
  open,
  onClose,
  onSubmit,
  fetchServices,
  fetchAddOns,
}) => {
  const [customerDetails, setCustomerDetails] = useState({
    unitNumber: "",
    unitName: "",
    customerName: "",
    address: "",
    phoneNumber: "",
  });
  const [services, setServices] = useState<
    { serviceId: number; serviceTypeId: number }[]
  >([]);
  const [addOns, setAddOns] = useState<
    { id: number; quantity: number; price: number }[]
  >([]);
  const [items, setItems] = useState<string[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [serviceOptions, setServiceOptions] = useState<IService[]>([]);
  const [addOnOptions, setAddOnOptions] = useState<IAddOn[]>([]);

  useEffect(() => {
    const loadOptions = async () => {
      const fetchedServices = await fetchServices();
      const fetchedAddOns = await fetchAddOns();
      setServiceOptions(fetchedServices);
      setAddOnOptions(fetchedAddOns);
    };

    loadOptions();
  }, [fetchServices, fetchAddOns]);

  const handleCustomerChange = (field: string, value: string) => {
    setCustomerDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddService = () => {
    setServices((prev) => [...prev, { serviceId: 0, serviceTypeId: 0 }]);
  };

  const handleServiceChange = (index: number, key: string, value: number) => {
    setServices((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };

  const handleRemoveService = (index: number) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddAddOn = () => {
    setAddOns((prev) => [...prev, { id: 0, quantity: 1, price: 0 }]);
  };

  const handleAddOnChange = (index: number, key: string, value: number) => {
    setAddOns((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };

      // Update the price automatically when ID changes
      if (key === "id") {
        const selectedAddOn = addOnOptions.find((a) => a.id === value);
        updated[index].price = selectedAddOn ? selectedAddOn.price : 0;
      }

      return updated;
    });
  };

  const handleRemoveAddOn = (index: number) => {
    setAddOns((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddItem = () => {
    setItems((prev) => [...prev, ""]);
  };

  const handleItemChange = (index: number, value: string) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const data = {
      customerDetails,
      services,
      addOns,
      items,
      discount,
    };
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add New Order</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off">
          {/* Customer Details */}
          <Typography variant="h6" gutterBottom>
            Customer Details
          </Typography>
          <Grid container spacing={2}>
            {Object.keys(customerDetails).map((key) => (
              <Grid item xs={6} key={key}>
                <TextField
                  label={key.replace(/([A-Z])/g, " $1")}
                  fullWidth
                  value={customerDetails[key as keyof typeof customerDetails]}
                  onChange={(e) => handleCustomerChange(key, e.target.value)}
                />
              </Grid>
            ))}
          </Grid>

          {/* Services and Add-Ons */}
          <Grid container spacing={2} marginTop={4}>
            {/* Services */}
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Services
              </Typography>
              {services.map((service, index) => (
                <Grid container spacing={2} key={index} alignItems="center">
                  <Grid item xs={5}>
                    <TextField
                      select
                      label="Service"
                      fullWidth
                      value={service.serviceId || ""}
                      onChange={(e) =>
                        handleServiceChange(
                          index,
                          "serviceId",
                          parseInt(e.target.value, 10)
                        )
                      }
                    >
                      {serviceOptions.map((s) => (
                        <MenuItem key={s.id} value={s.id}>
                          {s.serviceName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      select
                      label="Service Type"
                      fullWidth
                      value={service.serviceTypeId || ""}
                      onChange={(e) =>
                        handleServiceChange(
                          index,
                          "serviceTypeId",
                          parseInt(e.target.value, 10)
                        )
                      }
                      disabled={!service.serviceId}
                    >
                      {serviceOptions
                        .find((s) => s.id === service.serviceId)
                        ?.serviceTypes.map((type) => (
                          <MenuItem key={type.id} value={type.id}>
                            {type.serviceType} - {type.price.toLocaleString()}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton onClick={() => handleRemoveService(index)}>
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button onClick={handleAddService}>Add Service</Button>
            </Grid>

            {/* Add-Ons */}
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Add-Ons
              </Typography>
              {addOns.map((addOn, index) => (
                <Grid container spacing={2} key={index} alignItems="center">
                  <Grid item xs={7}>
                    <TextField
                      select
                      label="Add-On"
                      fullWidth
                      value={addOn.id || ""}
                      onChange={(e) =>
                        handleAddOnChange(
                          index,
                          "id",
                          parseInt(e.target.value, 10)
                        )
                      }
                    >
                      {addOnOptions.map((a) => (
                        <MenuItem key={a.id} value={a.id}>
                          {`${a.addOnName} - ${a.price.toLocaleString()}`}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      type="number"
                      label="Quantity"
                      fullWidth
                      value={addOn.quantity}
                      onChange={(e) =>
                        handleAddOnChange(
                          index,
                          "quantity",
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton onClick={() => handleRemoveAddOn(index)}>
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button onClick={handleAddAddOn}>Add Add-On</Button>
            </Grid>
          </Grid>

          {/* Items and Discount */}
          <Grid container spacing={2} marginTop={4}>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Items
              </Typography>
              {items.map((item, index) => (
                <Grid container spacing={2} key={index} alignItems="center">
                  <Grid item xs={10}>
                    <TextField
                      fullWidth
                      label={`Item ${index + 1}`}
                      value={item}
                      onChange={(e) => handleItemChange(index, e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton onClick={() => handleRemoveItem(index)}>
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button onClick={handleAddItem}>Add Item</Button>
            </Grid>

            <Grid item xs={5}>
              <Typography variant="h6" gutterBottom>
                Discount
              </Typography>
              <TextField
                type="number"
                label="Discount"
                fullWidth
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value))}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormOrder;
