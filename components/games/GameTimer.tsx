'use client'
import React, { useState, useRef, useEffect, SetStateAction } from 'react'
import DefaultButton from '@/components/buttons/DefaultButton'

interface GameTimerProps {
  /** Optional starting minutes (default 0) */
  initialMinutes?: number
  /** Optional starting seconds (default 0) */
  initialSeconds?: number
  // Provided to trigger a game-wide reset function from parent comp
  parentResetFunction?: React.Dispatch<SetStateAction<boolean>>
}

export default function GameTimer({
  initialMinutes = 0,
  initialSeconds = 0,
  parentResetFunction
}: GameTimerProps) {
  const [minutes, setMinutes] = useState(initialMinutes)
  const [seconds, setSeconds] = useState(initialSeconds)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Start the timer (stop if already running)
  const start = () => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(() => {
      setSeconds(s => {
        if (s + 1 >= 60) {
          setMinutes(m => m + 1)
          return 0
        }
        return s + 1
      })
    }, 1000)
  }

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const reset = () => {
    stop()
    if (parentResetFunction) parentResetFunction(true)
    setMinutes(initialMinutes)
    setSeconds(initialSeconds)
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Format as MM:SS
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  return (
    <div className='container-border container-background flex w-full flex-row items-center gap-4'>
      {/* Time display with a little pop animation on change */}
      <p className='header'>{formatted}</p>

      {/* Controls */}
      <div className='flex flex-row gap-2'>
        <DefaultButton
          handleClick={start}
          customClasses='primary-background w-24 h-10 button-border hover-effect'
        >
          <p className='button-text subheader'>Start</p>
        </DefaultButton>

        <DefaultButton
          handleClick={stop}
          customClasses='secondary-background w-24 h-10 button-border hover-effect'
        >
          <p className='button-text subheader'>Stop</p>
        </DefaultButton>

        <DefaultButton
          handleClick={reset}
          customClasses='secondary-background w-24 h-10 button-border hover-effect'
        >
          <p className='button-text subheader'>Reset</p>
        </DefaultButton>
      </div>
    </div>
  )
}
