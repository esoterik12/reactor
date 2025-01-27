import React from 'react'
import WatchPairsInput from './WatchPairsInput'

type SelectWatchComponentProps = {
  watchComponentSelection: 'pairs' | undefined
  inputText: string
}

const SelectWatchComponent = ({
  watchComponentSelection,
  inputText
}: SelectWatchComponentProps) => {
  return (
    <>
      {watchComponentSelection === 'pairs' && (
        <WatchPairsInput inputText={inputText} />
      )}
    </>
  )
}

export default SelectWatchComponent
