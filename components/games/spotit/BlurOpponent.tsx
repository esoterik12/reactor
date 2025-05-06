'use client'
import { AnimatePresence, motion } from 'framer-motion'
import DefaultButton from '@/components/buttons/DefaultButton'
import IconAngry from '@/components/icons/IconAngry'
import { RefObject } from 'react'

type BlurOpponentProps = {
  displayCondition: boolean
  handleBlurOpponent: () => void
  isLoadingRef: RefObject<boolean>
}

const BlurOpponent = ({
  displayCondition,
  handleBlurOpponent,
  isLoadingRef
}: BlurOpponentProps) => {
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
            <DefaultButton
              isDisabled={!displayCondition}
              handleClick={handleBlurOpponent}
            >
              <div className='flex w-full flex-row items-center justify-center p-1'>
                <IconAngry
                  classes={`h-11 w-11 ${displayCondition ? 'paragraph-text' : 'text-red-600'}`}
                />
              </div>
            </DefaultButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default BlurOpponent
