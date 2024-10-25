import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import notificationReducer from "./slices/notificationSlice";
import paginationnReducer from "./slices/paginationSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  pagination: paginationnReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
