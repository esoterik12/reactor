import { motion, Variants } from 'framer-motion'
import { useRef, useState, useLayoutEffect } from 'react'
import { SpotItWord } from '@/types/games.types'

interface ScatterTextProps {
  items: SpotItWord[]
  playerNumber: number
  handleClickWord: ({ clickedWord }: { clickedWord: SpotItWord }) => void
  matchedWord: string | null
  isBlurred: number[]
  isFullScreen: boolean
  numOfPlayers: number[]
}

function ScatterText({
  items,
  playerNumber,
  handleClickWord,
  matchedWord,
  isBlurred,
  isFullScreen,
  numOfPlayers
}: ScatterTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([])
  const [sizes, setSizes] = useState<{ w: number; h: number }[]>([])
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [ready, setReady] = useState(false)

  // measure each word's size on first render
  useLayoutEffect(() => {
    const newSizes = items.map((_, i) => {
      const el = spanRefs.current[i]!
      const { width: w, height: h } = el.getBoundingClientRect()
      return { w, h }
    })
    setSizes(newSizes)
  }, [items, isFullScreen, numOfPlayers])

  // compute non-overlapping positions
  useLayoutEffect(() => {
    const box = containerRef.current?.getBoundingClientRect()
    if (!box || sizes.length !== items.length) return

    const placed: { x: number; y: number; w: number; h: number }[] = []
    const newPos: { x: number; y: number }[] = []

    items.forEach((_, i) => {
      const { w, h } = sizes[i]
      let attempt = 0
      let x!: number, y!: number

      do {
        x = Math.random() * (box.width - w)
        y = Math.random() * (box.height - h)
        const collides = placed.some(
          p => !(x + w < p.x || x > p.x + p.w || y + h < p.y || y > p.y + p.h)
        )
        if (!collides) break
        attempt++
      } while (attempt < 50)

      // either found free spot or give up and place anyway
      placed.push({ x, y, w, h })
      newPos.push({ x, y })
    })

    setPositions(newPos)
    setReady(true)
  }, [sizes, isFullScreen, numOfPlayers])

  // Framer variants
  const itemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: ({ x, y }: { x: number; y: number }) => ({
      opacity: 1,
      x,
      y,
      transition: { type: 'spring', stiffness: 200, damping: 20 }
    })
  }

  if (items.length > 21) {
    return (
      <div className='flex h-full flex-row items-center justify-center'>
        <p className='mb-24'>
          It is not possible to render more than 20 words.
        </p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className='relative h-4/6 w-full items-center justify-center'
    >
      {/* render hidden spans for measurement */}
      {items.map((text, i) => (
        <span
          key={'m' + i}
          ref={el => {
            spanRefs.current[i] = el
          }}
          style={{
            position: 'absolute',
            visibility: 'hidden',
            whiteSpace: 'nowrap',
            fontSize: '24px'
          }}
        >
          {text.word}
        </span>
      ))}

      {ready &&
        items.map((word, wordIdx) => (
          <motion.div
            key={`words-container-${playerNumber}-${wordIdx}`}
            variants={itemVariants}
            initial='hidden'
            animate='visible'
            custom={positions[wordIdx]}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              whiteSpace: 'nowrap'
            }}
          >
            <p
              key={`spotItWord1-${word.wordId}-${playerNumber}`}
              onClick={() => handleClickWord({ clickedWord: word })}
              className={`${word.word === matchedWord ? 'tertiary-text' : 'transition-effect'} ${isBlurred.includes(playerNumber) && 'blur-sm'} subheader hover:cursor-pointer`}
            >
              {word.word}
            </p>
          </motion.div>
        ))}
    </div>
  )
}

export default ScatterText
