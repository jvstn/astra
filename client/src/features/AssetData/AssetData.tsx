import { Stack, Typography } from '@mui/material';
import React, { ReactElement, useEffect } from 'react'
import LineGraph from '../../components/LineGraph';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAssetData } from './assetDataSlice';



export default function AssetData(): ReactElement {
  const dispatch = useAppDispatch();
  const selectedAsset = useAppSelector(state => state.asset.selectedAsset);
  const dates = useAppSelector(state => state.assetData.dates);
  const prices = useAppSelector(state => state.assetData.prices);
  const quoteCurrency = selectedAsset.split('-')[1];
  useEffect(() => {
    dispatch(fetchAssetData(selectedAsset));
  }, [selectedAsset, dispatch]);
  return (
    <>
      <Stack alignItems="center" direction="row" spacing={30}>
        <Typography variant="h4">{selectedAsset}</Typography>
        <Stack textAlign="center" justifyItems="center">
          <Typography variant="h4">{prices[299]} {quoteCurrency}</Typography>
        </Stack>
      </Stack>
      <LineGraph name={selectedAsset} dates={dates.slice(0, 100)} values={prices.slice(0, 100)} />
    </>
  )
}
