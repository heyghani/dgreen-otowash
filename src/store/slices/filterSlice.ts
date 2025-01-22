import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  query?: string;
}

const initialState: FilterState = {
  query: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter: (state, { payload }: PayloadAction<FilterState>) => {
      state.query = payload.query;
    },
  },
});

export const { updateFilter } = filterSlice.actions;
export default filterSlice.reducer;
