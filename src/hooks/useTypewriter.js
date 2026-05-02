import { useState, useEffect } from 'react'

/**
 * Animates a string character by character.
 * Returns { displayed, done }.
 */
export function useTypewriter(text, speed = 65) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!text) return
    setDisplayed('')
    setDone(false)
    let i = 0
    const iv = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(iv)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(iv)
  }, [text, speed])

  return { displayed, done }
}
