import { Typography } from '@mui/material';
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
      <Typography variant="h2">{selectedAsset}</Typography>
      <LineGraph name={selectedAsset} dates={dates} values={prices} />
    </>
  )
}
