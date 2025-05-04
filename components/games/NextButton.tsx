'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { RefObject } from 'react'
import DefaultButton from '../buttons/DefaultButton'
import IconCheckCircle from '../icons/IconCheckCircle'

interface NextButtonProps {
  nextFn: () => void
  displayCondition: boolean
  isLoadingRef: RefObject<boolean>
}

const NextButton = ({
  nextFn,
  displayCondition,
  isLoadingRef
}: NextButtonProps) => {
  return (
    <>
      <AnimatePresence
        mode='wait'
        onExitComplete={() => {
          isLoadingRef.current = false
        }}
      >
        {displayCondition && (
          <motion.div
            key='next-word-button'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.18 }}
            className='flex w-full flex-col items-center justify-center gap-8'
          >
            <DefaultButton handleClick={() => nextFn()}>
              <IconCheckCircle classes='h-12 w-12 tertiary-text' />
            </DefaultButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default NextButton
