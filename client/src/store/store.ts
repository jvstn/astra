import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import asset from '../features/AssetSelector/assetSelectorSlice';
import assetData from '../features/AssetData/assetDataSlice';
import strategy from '../features/StrategySelector/strategySlice';
import orders from '../features/Sidepanel/ordersSlice';
import watchlist from '../features/WatchlistContainer/watchlistSlice';
import user from '../features/AuthForm/authSlice';

export const store = configureStore({
  reducer: {
    asset,
    assetData,
    strategy,
    orders,
    watchlist,
    user
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
