'use client'
import React, { useState, useEffect } from 'react'

type AnimatedText = {
  chatHistory: string
  interval?: number
}

const AnimatedText = ({chatHistory, interval = 20}: AnimatedText) => {
  // const [completedTyping, setCompletedTyping] = useState(false)
  const [displayResponse, setDisplayResponse] = useState('')

  useEffect(() => {
    // setCompletedTyping(false);
  
    let i = 0;
    const stringResponse = chatHistory
  
    const intervalId = setInterval(() => {
      setDisplayResponse(stringResponse.slice(0, i));
  
      i++;
  
      if (i > stringResponse.length) {
        clearInterval(intervalId);
        // setCompletedTyping(true);
      }
    }, interval);
  
    return () => clearInterval(intervalId);
  }, [chatHistory, interval]);


  return (
    <div>{displayResponse}</div>
  )
}

export default AnimatedText