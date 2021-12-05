import { Stack, Typography } from '@mui/material';
import React, { ReactElement } from 'react'
import StrategyCard from '../../components/StrategyCard'
import { bollingerBandsContent, targetPriceContent, rsiContent, StrategyContent } from '../../utils/strategyContent'

const strategyContents: StrategyContent[] = [
  targetPriceContent,
  bollingerBandsContent,
  rsiContent,
];

export default function StrategySelector(): ReactElement {
  
  
  return (
    <>
      <Typography textAlign="center" variant="h6" >
        Strategies
      </Typography>
      <Stack direction="row" spacing={5}>
        {strategyContents.map((content, index) => (
          <StrategyCard content={content} />
        ))}
      </Stack>
    </>
  );
}
