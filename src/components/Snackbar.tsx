"use client";
// import modules
import React from "react";
import { Alert, Snackbar } from "@mui/material";

// import context
import { useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { updateNotification } from "@/store/slices/notificationSlice";

const SnackbarNotification = () => {
  const dispatch = useAppDispatch();
  const notification = useSelector((state: RootState) => state.notification);

  const handleClose = () => {
    dispatch(
      updateNotification({
        ...notification,
        show: false,
      })
    );
  };

  return (
    <Snackbar
      anchorOrigin={notification.position}
      open={notification.show}
      autoHideDuration={2000}
      onClose={handleClose}
      message={notification.message}
    >
      <Alert
        onClose={handleClose}
        variant="filled"
        severity={notification.type}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
