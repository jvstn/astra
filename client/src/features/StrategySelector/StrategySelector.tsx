import { Stack } from '@mui/material';
import React, { ReactElement, useEffect } from 'react';
import StrategyCard from '../../components/StrategyCard';
import { useAppDispatch } from "../../store/hooks";
import { bollingerBandsContent, rsiContent, StrategyContent, targetPriceContent } from '../../utils/strategyContent';
import { getActiveStrategies } from './strategySlice';
const strategyContents: StrategyContent[] = [
  targetPriceContent,
  bollingerBandsContent,
  rsiContent,
];

export default function StrategySelector(): ReactElement {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getActiveStrategies())
  }, [dispatch]);
  
  return (
    <>
      <Stack direction="row" spacing={5}>
        {strategyContents.map((content, index) => (
          <StrategyCard content={content} />
        ))}
      </Stack>
    </>
  );
}
