import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AsyncInitialState } from "../../store/hooks";
import axios from "axios";
import { RootState } from "../../store/store";

export type OrderSide = "BUY" | "SELL";

export interface StrategyRequestBody {
  product_id: string;
  side?: OrderSide | undefined;
  price?: Number | undefined;
  amount?: Number | undefined;
  interval?: number | undefined;
}

interface StrategyState extends AsyncInitialState {
  selectedStrategy: string;
}

const initialState: StrategyState = {
  selectedStrategy: "",
  loading: "idle",
  error: null,
};

export const startStrategy = createAsyncThunk<
  any,
  StrategyRequestBody,
  { state: RootState }
>("strategy/startStrategy", async (requestBody, thunkApi) => {
  const { strategy } = thunkApi.getState();
  const { selectedStrategy } = strategy;
  try {
    const response = await axios.post(
      `/strategy/${selectedStrategy}`,
      requestBody
    );
    return response.data;
  } catch (error) {
    thunkApi.rejectWithValue(error);
  }
});

const strategySlice = createSlice({
  name: "strategy",
  initialState,
  reducers: {
    setSelectedStrategy: (state, action) => {
      state.selectedStrategy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(startStrategy.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(startStrategy.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(startStrategy.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message as string;
    });
  },
});

export const { setSelectedStrategy } = strategySlice.actions;
export default strategySlice.reducer;
