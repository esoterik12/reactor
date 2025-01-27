import React from 'react'

type WatchPairsInputProps = {
  inputText: string
}

const WatchPairsInput = ({ inputText }: WatchPairsInputProps) => {
  return (
    <div className=''>
      <p className='paragraph-text'>Current pairs:</p>
      <div className='container-border page-background mt-2 grid h-20 grid-cols-8 p-2'>
        {inputText.split(',').map((word, index) => (
          <p key={index} className={`${index % 2 === 0 && 'mr-2 text-right'} m-1`}>
            {word}
          </p>
        ))}
      </div>
    </div>
  )
}

export default WatchPairsInput
