import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import asset from '../features/AssetSelector/assetSelectorSlice';
import strategy from '../features/StrategySelector/strategySlice';
import orders from '../features/OrdersList/ordersSlice';

export const store = configureStore({
  reducer: {
    asset,
    strategy,
    orders,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
