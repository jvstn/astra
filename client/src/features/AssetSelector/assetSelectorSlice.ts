import { createSlice } from '@reduxjs/toolkit';


interface InitialState {
  selectedAsset: string;
}

const initialState: InitialState = {
  selectedAsset: 'BTC-USD',
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
