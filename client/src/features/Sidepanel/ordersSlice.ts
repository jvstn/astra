import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AsyncInitialState } from "../../store/hooks";
import { RootState } from "../../store/store";

export type OrderType = "open" | "fill";

export interface Order {
  id: number;
  order_id: string;
  price: string;
  product_id: string;
  side: string;
  size: string;
  time: string;
  type: "open" | "done";
}

interface InitialState extends AsyncInitialState {
  fill: Order[];
  open: Order[];
  baseBalance: number;
  quoteBalance: number;
}

const initialState: InitialState = {
  fill: [],
  open: [],
  baseBalance: 0,
  quoteBalance: 0,
  loading: "idle",
  error: null,
};

export const getAccountBalances = createAsyncThunk(
  "orders/getAccount",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { selectedAsset } = state.asset;
    try {
      const {data} = await axios.get(
        "/user/account", {
          params: {
            product_id: selectedAsset,
          },
      }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchOrders = createAsyncThunk<
  any,
  OrderType,
  { state: RootState }
>("orders/fetchOpenOrders", async (orderType, { getState,  }) => {
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
    // Handle orders
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
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message as string;
    });
    // Handle account balance
    builder.addCase(getAccountBalances.pending, (state) => {
      state.loading = "pending";
    }
    );
    builder.addCase(getAccountBalances.fulfilled, (state, { payload }) => {
      state.loading = "succeeded";
      state.baseBalance = Number(payload.baseBalance);
      state.quoteBalance = Number(payload.quoteBalance);
    }
    );
    builder.addCase(getAccountBalances.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message as string;
    }
    );
  },
});

export const { setOpenOrders, setFillOrders, addNewOrder } =
  ordersSlice.actions;
export default ordersSlice.reducer;
