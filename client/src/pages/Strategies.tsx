import { Paper, Stack, Theme, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import React, { ReactElement } from 'react'
import Sidebar from '../components/Sidebar'
import { bollingerBandsContent, rsiContent, targetPriceContent } from '../utils/strategyContent'

const strategies = [
  targetPriceContent,
  bollingerBandsContent,
  rsiContent
]

const useStyles = makeStyles((theme: Theme) => (
  createStyles({
    paper: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      width: "23vw"
    }
  })
))

  

export default function Strategies(): ReactElement {
  const classes = useStyles()
  return (
    <Sidebar>
      <Stack spacing={7} direction="row">
        {strategies.map((strategy, index) => (
          <Paper className={classes.paper} key={index}>
            <Stack spacing={7}>
              <Typography variant="h5">{strategy.name}</Typography>
              
              <Typography variant="body1">{strategy.explanation}</Typography>
            </Stack>
          </Paper>
          ))}
      </Stack>
    </Sidebar>
  )
}