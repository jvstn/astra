import React, { ReactElement } from 'react'
import Sidebar from '../components/Sidebar'
import WatchlistContainer from '../features/WatchlistContainer/WatchlistContainer'

interface Props {
  
}

export default function Watchlist({}: Props): ReactElement {
  return (
    <>
      <Sidebar>
        <WatchlistContainer />
      </Sidebar>
    </>
  )
}
