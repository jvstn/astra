import { Stack, Typography } from '@mui/material';
import React, { ReactElement } from 'react'
import StrategyCard from '../../components/StrategyCard'
import { bollingerBandsContent, limitOrderContent, rsiContent, StrategyContent } from './StrategyContent'

const strategyContents: StrategyContent[] = [
  limitOrderContent,
  bollingerBandsContent,
  rsiContent,
];

export default function StrategySelector(): ReactElement {
  
  
  return (
    <>
      <Typography textAlign="center" variant="h4" gutterBottom>
        Select a strategy
      </Typography>
      <Stack direction="row" spacing={5}>
        {strategyContents.map((content, index) => (
          <StrategyCard content={content} />
        ))}
      </Stack>
    </>
  );
}
