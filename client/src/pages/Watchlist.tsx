import React, { ReactElement } from 'react'
import Sidebar from '../components/Sidebar'

interface Props {
  
}

export default function Watchlist({}: Props): ReactElement {
  return (
    <>
      <Sidebar>
        <h1>Watchlist</h1>
      </Sidebar>
    </>
  )
}
