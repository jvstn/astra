import React, { ReactElement } from 'react'
import Sidebar from '../components/Sidebar'
import WatchlistContainer from '../features/WatchlistContainer/WatchlistContainer'



export default function Watchlist(): ReactElement {
  return (
    <>
      <Sidebar>
        <WatchlistContainer />
      </Sidebar>
    </>
  )
}
