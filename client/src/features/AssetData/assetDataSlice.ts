import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AsyncInitialState } from "../../store/hooks";
import { RootState } from "../../store/store";
import {format} from 'date-fns'


interface InitialState extends AsyncInitialState {
  dates: string[];
  prices: number[];
}

const initialState: InitialState = {
  prices: [],
  dates: [],
  loading: "idle",
  error: null,
};

export const fetchAssetData = createAsyncThunk<
  any,
  string,
  { state: RootState }
>("assetData", async (product_id, thunkApi) => {
  const { data } = await axios.get(
    `https://api-public.sandbox.exchange.coinbase.com/products/${product_id}/candles/`,
    {
      params: {
        granularity: "60",
      },
    }
  );
  let dates: string[] = [];
  let prices: number[] = [];
  data.forEach((ohlc: any) => {
    const timestamp = new Date(ohlc[0] * 1000);
    dates.push(format(timestamp, "MMM-dd-yyyy HH:mm"));
    prices.push(ohlc[4]);
  });
  
  return { dates, prices };
});

const assetDataSlice = createSlice({
  name: "assetData",
  initialState,
  reducers: {
    setPrices: (state, action) => {
      state.prices = action.payload.prices;
    },
    setDates: (state, action) => {
      state.dates = action.payload.dates;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAssetData.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(fetchAssetData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.prices = action.payload.prices;
      state.dates = action.payload.dates;
    });
    builder.addCase(fetchAssetData.rejected, (state, action) => {
      state.loading = "failed";
      console.log(action.error);
      state.error = action.error.message as string;
    });
  },
});

export const { setPrices, setDates } = assetDataSlice.actions;
export default assetDataSlice.reducer;
