'use client'
import { motion } from 'framer-motion'
import { WordPairingWithIds } from '@/lib/utils/game-utils/memoryGameReducer'

interface MemoryCardProps {
  front: number
  wordObj: WordPairingWithIds
  currentWords: WordPairingWithIds[]
  handleClickWord: (word: WordPairingWithIds) => void
}

const MemoryCard = ({
  front,
  wordObj,
  currentWords,
  handleClickWord
}: MemoryCardProps) => {
  const isFlipped = wordObj.wordIsShowing
  const disabled =
    wordObj.wordHasMatched || isFlipped || currentWords.length === 2

  return (
    <motion.div
      className='h-full w-full cursor-pointer p-2 [perspective:1000px]'
      onClick={() => !disabled && handleClickWord(wordObj)}
    >
      <motion.div
        className={`${wordObj.wordHasMatched && 'paragraph-text'} relative h-full w-full rounded-lg [transform-style:preserve-3d]`}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Front: */}
        <motion.div className='primary-background absolute flex h-full w-full items-center justify-center rounded-md [backface-visibility:hidden]'>
          <p className='button-text large-text text-center'>{front}</p>
        </motion.div>

        {/* Back */}
        <motion.div className='page-background absolute flex h-full w-full items-center justify-center rounded-md [backface-visibility:hidden] [transform:rotateY(180deg)]'>
          <motion.p
            className='text-center'
            animate={
              wordObj.wordHasMatched
                ? { color: ['#71717a', '#34d399', '#71717a'] }
                : { color: '#71717a' }
            }
            transition={{ duration: 2, times: [0, 0.5, 1] }}
          >
            {wordObj.word}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default MemoryCard
