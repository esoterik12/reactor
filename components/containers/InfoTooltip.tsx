'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { InfoTextObject } from '@/types/input.types'

interface InfoTooltipProps {
  info: InfoTextObject | null
}

const InfoTooltip = ({ info }: InfoTooltipProps) => {
  return (
    <AnimatePresence mode='wait'>
      {info && (
        <motion.div
          key={info.title} // This triggers re-animation on change
          className='h-full rounded-lg px-4'
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <div className='large-text flex flex-row'>
            <h3>{info !== null && info.title}</h3>
          </div>
          <p className='paragraph-text mt-2'>
            {info !== null && info.inputInfo}
          </p>
          <p className='paragraph-text mt-2'>
            {info !== null && info.inputExample}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default InfoTooltip
