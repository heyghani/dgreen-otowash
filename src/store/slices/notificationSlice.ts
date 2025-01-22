import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertColor } from "@mui/material";

interface NotificationPosition {
  vertical: "bottom" | "top";
  horizontal: "left" | "center" | "right";
}

interface NotificationState {
  show: boolean;
  type: AlertColor;
  position: NotificationPosition;
  message: string;
}

const initialState: NotificationState = {
  show: false,
  type: "error",
  position: {
    horizontal: "center",
    vertical: "top",
  },
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    updateNotification: (
      state,
      { payload }: PayloadAction<NotificationState>
    ) => {
      state.show = payload.show;
      state.message = payload.message;
      state.type = payload.type;
      state.position = payload.position;
    },
  },
});

export const { updateNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
