import { useState, useRef, useCallback, useEffect } from 'react'

interface UseFullscreenReturn<T extends HTMLElement> {
  containerRef: React.RefObject<T | null>
  isFullscreen: boolean
  enterFullscreen: () => Promise<void>
  exitFullscreen: () => Promise<void>
  toggleFullScreen: () => void
}

export function useFullscreen<T extends HTMLElement>(): UseFullscreenReturn<T> {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<T>(null)

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const enterFullscreen = useCallback(async () => {
    const el = containerRef.current
    if (!el) return
  
    const fn =
      el.requestFullscreen?.bind(el) ??
      el.webkitRequestFullscreen?.bind(el) ??
      el.msRequestFullscreen?.bind(el)
  
    if (fn) await fn()
  }, [])

  const exitFullscreen = useCallback(async () => {
    const fn =
      document.exitFullscreen?.bind(document) ??
      document.webkitExitFullscreen?.bind(document) ??
      document.msExitFullscreen?.bind(document)
  
    if (fn) await fn()
  }, [])

  const toggleFullScreen = useCallback(() => {
    if (isFullscreen) exitFullscreen()
    else enterFullscreen()
  }, [isFullscreen, enterFullscreen, exitFullscreen])

  return {
    containerRef,
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    toggleFullScreen
  }
}
