import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AsyncInitialState } from '../../store/hooks';
import { RootState } from '../../store/store';


interface InitialState extends AsyncInitialState {
  selectedAsset: string;
}

const initialState: InitialState = {
  selectedAsset: 'BTC-USD',
  loading: 'idle',
  error: null,
};


const assetSelectorSlice = createSlice({
  name: 'assetSelector',
  initialState,
  reducers: {
    setSelectedAsset: (state, action) => {
      state.selectedAsset = action.payload;
    },
  }
});

export const { setSelectedAsset } = assetSelectorSlice.actions;
export default assetSelectorSlice.reducer;
