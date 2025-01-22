import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  currentPage: number;
  limit: number;
}

const initialState: PaginationState = {
  currentPage: 0,
  limit: 15,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    updatePagination: (state, { payload }: PayloadAction<PaginationState>) => {
      state.currentPage = payload.currentPage;
      state.limit = payload.limit;
    },
  },
});

export const { updatePagination } = paginationSlice.actions;
export default paginationSlice.reducer;
