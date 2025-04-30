import { useRef, useEffect, useCallback } from 'react'
import { SoundKey } from '@/types/soundTypes'
import { getSoundUrl } from '../sound/getSoundUrl'

export function useSoundPlayer(soundKey: SoundKey, volume: number = 1) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize Audio object
  useEffect(() => {
    const audio = new Audio(getSoundUrl(soundKey))
    audio.volume = volume
    audioRef.current = audio
  }, [soundKey, volume])

  // Play method
  const play = useCallback(() => {
    if (typeof window === 'undefined') return
    const audio = audioRef.current
    if (!audio) return

    // Rewind and play (important for rapid replays)
    audio.currentTime = 0
    audio.play().catch(err => {
      console.warn('Unable to play sound:', soundKey, err)
    })
  }, [soundKey])

  return { play }
}
