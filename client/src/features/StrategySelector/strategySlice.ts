import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  selectedStrategy: string;
}

const initialState: InitialState = {
  selectedStrategy: "",
};

const strategySlice = createSlice({
  name: "strategySelector",
  initialState,
  reducers: {
    setSelectedStrategy: (state, action) => {
      state.selectedStrategy = action.payload;
    },
  },
});

export const { setSelectedStrategy } = strategySlice.actions;
export default strategySlice.reducer;
