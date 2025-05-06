'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { RefObject } from 'react'
import DefaultButton from '../buttons/DefaultButton'
import IconRocket from '../icons/IconRocket'

interface BonusPointsButtonProps {
  bonusPointsFn: () => void
  displayCondition: boolean
  isLoadingRef: RefObject<boolean>
}

const BonusPointsButton = ({
  bonusPointsFn,
  displayCondition,
  isLoadingRef
}: BonusPointsButtonProps) => {
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
            <DefaultButton handleClick={() => bonusPointsFn()}>
              <IconRocket classes='h-12 w-12 secondary-text' />
            </DefaultButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default BonusPointsButton
