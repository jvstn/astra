import { createSlice } from '@reduxjs/toolkit';


interface initialState {
  selectedAsset: string;
}

const initialState: initialState = {
  selectedAsset: 'BTC',
};

const assetSelectorSlice = createSlice({
  name: 'assetSelector',
  initialState,
  reducers: {
    setSelectedAsset: (state, action) => {
      console.log("Hello again")
      state.selectedAsset = action.payload;
    },
  }
});

export const { setSelectedAsset } = assetSelectorSlice.actions;
export default assetSelectorSlice.reducer;
