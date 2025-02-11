import React, { useState, useEffect } from 'react'

function GeneratingContent() {
  const messages = [
    'Processing input...',
    'Generating content...',
    'Finalizing...'
  ]

  // Start hidden (fade=false) so we can fade in on mount.
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(false)

  // Fade in on initial mount.
  useEffect(() => {
    const fadeInTimeout = setTimeout(() => {
      setFade(true)
    }, 100) // Delay a bit before fading in (adjust as needed)
    return () => clearTimeout(fadeInTimeout)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade out
      setFade(false)

      // After a short delay, update the message index & fade in
      setTimeout(() => {
        setIndex(prevIndex => {
          return prevIndex < messages.length - 1 ? prevIndex + 1 : prevIndex
        })
        setFade(true)
      }, 500) // This delay should match your fade-out duration.
    }, 2000)

    return () => clearInterval(interval)
  }, [messages.length])

  return (
    <div
      style={{
        opacity: fade ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out'
      }}
    >
      {messages[index]}
    </div>
  )
}

export default GeneratingContent
