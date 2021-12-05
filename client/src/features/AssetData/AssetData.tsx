import { Stack, Typography } from '@mui/material';
import React, { ReactElement, useEffect } from 'react'
import LineGraph from '../../components/LineGraph';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAssetData } from './assetDataSlice';

interface Props {
  
}

export default function AssetData({ }: Props): ReactElement {
  const dispatch = useAppDispatch();
  const selectedAsset = useAppSelector(state => state.asset.selectedAsset);
  const dates = useAppSelector(state => state.assetData.dates);
  const prices = useAppSelector(state => state.assetData.prices);
  useEffect(() => {
    dispatch(fetchAssetData(selectedAsset));
  }, [selectedAsset])
  return (
    <>
      <Stack alignItems="center" direction="row" spacing={20}>
        <Typography variant="h2">{selectedAsset}</Typography>
        <Stack textAlign="center" justifyItems="center">
          <Typography variant="h4">$ {prices[299]}</Typography>
          <Typography variant="body1">Last trade price</Typography>
        </Stack>
      </Stack>
      <LineGraph name={selectedAsset} dates={dates.slice(0, 100)} values={prices.slice(0, 100)} />
    </>
  )
}
