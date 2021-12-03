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
      {strategyContents.map((content, index) => (
        <StrategyCard content={content} />
      ))}
    </>
  )
}
