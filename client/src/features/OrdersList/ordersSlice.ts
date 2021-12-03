import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AsyncInitialState } from "../../store/hooks";
import { RootState } from "../../store/store";
import { OrderSide } from "../StrategySelector/strategySlice";


export type OrderType = "open" | "fill";

export interface Order {
  id: number;
  order_id: number;
  price: number;
  product_id: number;
  side: string;
  size: string;
  type: "open" | "done";
}

interface InitialState extends AsyncInitialState {
  fill: [];
  open: [];
}

const initialState: InitialState = {
  loading: "idle",
  error: null,
  fill: [],
  open: [],
};

export const fetchOrders = createAsyncThunk<
  any,
  OrderType,
  { state: RootState }
>(
  "orders/fetchOpenOrders", async (orderType, {getState}) => {
    const product_id = getState().asset.selectedAsset;
    const { data: res } = await axios.get(`/orders/${orderType}/${product_id}`);
    
    return {orderType, res};
});

  

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOpenOrders: (state, action) => {
      state.open = action.payload;
    },
    setFillOrders: (state, action) => {
      state.fill = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle open orders
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchOrders.fulfilled, (state, {payload}) => {
      state.loading = "succeeded";
      if (payload.orderType === "open") {
        state.open = payload.res.data;
      } else {
        state.fill = payload.res.data;
      }
      console.log(payload);
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message as string;
    });
  }
});

export const { setOpenOrders: setOpen, setFillOrders: setFill } = ordersSlice.actions;
export default ordersSlice.reducer;

