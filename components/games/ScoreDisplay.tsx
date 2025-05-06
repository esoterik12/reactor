'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

interface ScoreDisplayProps {
  score: number
  streak?: number
}

const ScoreDisplay = ({ score, streak }: ScoreDisplayProps) => {
  const { theme } = useTheme()

  return (
    <div
      className={`${streak === undefined ? 'justify-center' : 'justify-between'} flex h-1/6 w-full flex-row items-center gap-2 px-2`}
    >
      <div className='flex flex-row'>
        <p className='subheader paragraph-text mr-1'>Score:</p>
        <motion.p
          key={`score-${score}-${theme}`} // re-runs animation on score or theme change
          initial={{
            scale: 1,
            color: theme === 'dark' ? '#ffffff' : '#000000'
          }}
          animate={{
            scale: [1, 1.1, 1],
            color: [
              `${theme === 'dark' ? '#ffffff' : '#000000'}`,
              '#f59e0b',
              `${theme === 'dark' ? '#ffffff' : '#000000'}`
            ]
          }}
          transition={{ duration: 0.4 }}
          className='subheader'
        >
          {score}
        </motion.p>
      </div>
      {streak !== undefined && (
        <div className='flex flex-row'>
          <p className='subheader paragraph-text mr-1'>Streak:</p>
          <motion.p
            key={`streak-${streak}-${theme}`} // re-runs animation on score or theme change
            initial={{
              scale: 1,
              color: theme === 'dark' ? '#ffffff' : '#000000'
            }}
            animate={{
              scale: [1, 1.1, 1],
              color: [
                `${theme === 'dark' ? '#ffffff' : '#000000'}`,
                '#f59e0b',
                `${theme === 'dark' ? '#ffffff' : '#000000'}`
              ]
            }}
            transition={{ duration: 0.4 }}
            className='subheader'
          >
            {streak}
          </motion.p>
        </div>
      )}
    </div>
  )
}

export default ScoreDisplay
