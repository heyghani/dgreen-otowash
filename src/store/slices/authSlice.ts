import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  username: string;
  password: string;
}

const initialState: LoginState = {
  username: "",
  password: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuthState: (state, { payload }: PayloadAction<LoginState>) => {
      state.username = payload.username;
      state.password = payload.password;
    },
  },
});

export const { updateAuthState } = authSlice.actions;
export default authSlice.reducer;
