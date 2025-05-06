'use client'

import { motion } from 'framer-motion'

type GamePlayerContainerProps = {
  playerNumber: number
  children: React.ReactNode
}

const GamePlayerContainer = ({
  playerNumber,
  children
}: GamePlayerContainerProps) => {
  return (
    <motion.div
      layout
      className='container-border container-background flex h-[70vh] w-full flex-col items-center justify-between gap-1 p-4'
      key={`player-number-${playerNumber}`}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 25 }}
      transition={{
        layout: { type: 'spring', stiffness: 456, damping: 45 },
        opacity: { duration: 0.4, ease: 'easeInOut' },
        y: { duration: 0.1, ease: 'easeOut' }
      }}
    >
      {children}
    </motion.div>
  )
}

export default GamePlayerContainer
