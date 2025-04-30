'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

interface ScoreDisplayProps {
  score: number
}

const ScoreDisplay = ({ score }: ScoreDisplayProps) => {
  const { theme } = useTheme()

  return (
    <div className='flex h-16 w-full flex-row items-center justify-center gap-2'>
      <p className='subheader paragraph-text'>Score:</p>
      <motion.p
        key={`${score}-${theme}`} // re-runs animation on score or theme change
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
  )
}

export default ScoreDisplay
