import { createSlice } from '@reduxjs/toolkit';
import { AsyncInitialState } from '../../store/hooks';


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
