import { Paper, Stack, Typography } from '@mui/material'
import React, { ReactElement } from 'react'
import Sidebar from '../components/Sidebar'
import { bollingerBandsContent, rsiContent, targetPriceContent } from '../utils/strategyContent'

const strategies = [
  targetPriceContent,
  bollingerBandsContent,
  rsiContent
]
  

export default function Strategies(): ReactElement {
  return (
    <Sidebar>
      <Stack spacing={7} direction="row">
        {strategies.map((strategy, index) => (
          <Paper key={index}>
            <Typography variant="h5">{strategy.name}</Typography>
            <Typography variant="body1">{strategy.description}</Typography>
            <Typography variant="body1">{strategy.explanation}</Typography>
          </Paper>
          ))}
      </Stack>
    </Sidebar>
  )
}