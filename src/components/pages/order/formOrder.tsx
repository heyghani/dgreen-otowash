"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";

interface FormOrderProps {
  open: boolean;
  onClose: () => void;
}

const FormOrder: React.FC<FormOrderProps> = ({ open, onClose }) => {
  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="md">
        <DialogTitle>Add New Order</DialogTitle>
        <DialogContent>
          <form onSubmit={() => {}} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Customer Name"
                className="border p-2 w-full"
              />
              <input
                type="text"
                placeholder="Item"
                className="border p-2 w-full"
              />
              <input
                type="number"
                placeholder="Quantity"
                className="border p-2 w-full"
              />
              <input
                type="number"
                placeholder="Price"
                className="border p-2 w-full"
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default FormOrder;
