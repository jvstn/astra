import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AsyncInitialState } from "../../store/hooks";
import { AppDispatch, RootState } from "../../store/store";
import { getProductData } from "../../utils/assetUtils";
import { fetchAssetData } from "../AssetData/assetDataSlice";
export type AssetData = {
  dates: string[];
    prices: number[];
}

type GraphData = {
  assetData: AssetData;
  product_id: string;
};

interface WatchlistState extends AsyncInitialState {
  watchlist: GraphData[];
  products: string[];
}

const initialState: WatchlistState = {
  watchlist: [],
  products: [],
  loading: "idle",
  error: null,
};

export const getProductList = createAsyncThunk(
  "watchlist/getProductList",
  async () => {
    const response = await axios.get(
      "https://api-public.sandbox.exchange.coinbase.com/products"
    );
    const products = response.data.map((product: any) => product.id);
    return products;
  }
);

export const getWatchlist = createAsyncThunk(
  "watchlist/getWatchlist",
  async (username: string, thunkAPI) => {
    const { data } = await axios.get(`user/watchlist/${username}`);
    const dispatch = thunkAPI.dispatch as AppDispatch;
    let graphData: GraphData[] = [];

    for (let product_id of data) {
      const assetData: AssetData = await getProductData(product_id)
      graphData.push({
        product_id,
        assetData
      })
    }
    console.log(graphData);
    return graphData;
  }
);

export const postWatchlistItem = createAsyncThunk<
  any,
  { product_id: string; username: string },
  { state: RootState }
>("postWatchlistItem", async ({ product_id, username }) => {
  const { data } = await axios.post("user/watchlist", { product_id, username });
  return data;
});

export const deleteWatchlistItem = createAsyncThunk<
  any,
  { product_id: string; username: string },
  { state: RootState }
>("deleteWatchlistItem", async ({ product_id, username }) => {
  const { data } = await axios.delete(`user/watchlist`, {
    params: {
      product_id,
      username,
    },
  });
  return data;
});

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist: (state, action) => {
      state.watchlist.push(action.payload);
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(
        (item) => item !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductList.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getProductList.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(getProductList.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = "failed";
    });
    builder.addCase(getWatchlist.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getWatchlist.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.watchlist = action.payload;
    });
    builder.addCase(getWatchlist.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message as string;
    });
    // Post watchlist item
    builder.addCase(postWatchlistItem.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(postWatchlistItem.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.watchlist.push(action.payload);
    });
    builder.addCase(postWatchlistItem.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message as string;
    });
    // Delete watchlist item
    builder.addCase(deleteWatchlistItem.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(deleteWatchlistItem.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.watchlist = state.watchlist.filter(
        (item) => item !== action.payload
      );
    });
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
