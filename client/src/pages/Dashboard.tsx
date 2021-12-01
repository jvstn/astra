import { Box } from '@mui/system'
import React, { ReactElement } from 'react'
import CryptoCard from '../components/CryptoCard'
import Sidebar from '../components/Sidebar'
import CoinSelector from '../features/AssetSelector/AssetSelector'

interface Props {
  
}

export default function Dashboard({}: Props): ReactElement {
  return (
    <>
      <Box display="flex" justifyContent="center">
        <Sidebar>
          <CoinSelector />
        </Sidebar>
      </Box>
    </>
  )
}
