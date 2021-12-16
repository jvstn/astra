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
  activeStrategies: string[];
}

const initialState: StrategyState = {
  selectedStrategy: "",
  activeStrategies: [],
  loading: "idle",
  error: "",
};

export const getActiveStrategies = createAsyncThunk(
  "strategy/getActiveStrategies",
  async (_, { getState }) => {
    const { asset } = getState() as RootState;
    const {selectedAsset} = asset;
    const response = await axios.get(
      `/strategy/active/${selectedAsset}`
    );
    return response.data;
  }
);

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

export const stopStrategy = createAsyncThunk("strategy/strategy/stop", async (strategyId: string, { getState }) => {
  const { asset } = getState() as RootState;
  const { selectedAsset } = asset;
  const response = await axios.delete(`/strategy/${strategyId}`, {
    params: {
      product_id: selectedAsset,
    }
  });
  return response.data;
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
    // Get Active Strategies
    builder.addCase(getActiveStrategies.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getActiveStrategies.fulfilled, (state, action) => {
      state.activeStrategies = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(getActiveStrategies.rejected, (state, action) => {
      state.error = action.error.message || "";
      state.loading = "failed";
    });
    // Start Strategy
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
    // Stop Strategy
    builder.addCase(stopStrategy.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(stopStrategy.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(stopStrategy.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message as string;
    });
  },
});

export const { setSelectedStrategy } = strategySlice.actions;
export default strategySlice.reducer;
