import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AsyncInitialState } from "../../store/hooks";
import { RootState } from "../../store/store";

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
  fill: Order[];
  open: Order[];
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
>("orders/fetchOpenOrders", async (orderType, { getState }) => {
  const product_id = getState().asset.selectedAsset;
  const { data: res } = await axios.get(`/orders/${orderType}/${product_id}`);

  return { orderType, res };
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
    addNewOrder: (state, { payload }: PayloadAction<Order>) => {
      if (payload.type === "open") {
        state.open.push(payload);
        state.open.shift();
      } else {
        state.fill.push(payload);
        state.fill.shift();
      }
    },
  },
  extraReducers: (builder) => {
    // Handle open orders
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchOrders.fulfilled, (state, { payload }) => {
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
  },
});

export const { setOpenOrders, setFillOrders, addNewOrder } =
  ordersSlice.actions;
export default ordersSlice.reducer;
