import React, { ReactElement } from 'react'
import StrategyCard from '../../components/StrategyCard'
import { bollingerBandsContent, limitOrderContent, rsiContent, StrategyContent } from './StrategyContent'



export default function StrategySelector(): ReactElement {
  const strategyContents: StrategyContent[] = [
    limitOrderContent,
    bollingerBandsContent,
    rsiContent
  ]
  
  return (
    <>
      {strategyContents.map((content, index) => (
        <StrategyCard content={content} />
      ))}
    </>
  )
}
