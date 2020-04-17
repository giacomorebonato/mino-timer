import { Button } from '@chakra-ui/core'
import NoSleep from 'nosleep.js'
import React, { useCallback, useRef } from 'react'
import * as Tone from 'tone'

declare global {
  interface Navigator {
    wakeLock: any
  }
}

export const AddExerciseButton = React.memo(() => {
  const isFirstClick = useRef(true)
  const handleClick = useCallback(() => {
    if (!isFirstClick.current) return

    // This button silently triggers consent for
    // * speech synthesis
    // * screen awake
    Tone.start()

    if (window.navigator.wakeLock) {
      const noSleep = new NoSleep()
      noSleep.enable()
    }

    if (window.speechSynthesis) {
      const ssu = new window.SpeechSynthesisUtterance('')
      window.speechSynthesis.speak(ssu)
    }

    isFirstClick.current = false
  }, [])

  return (
    <Button
      id='ios-speak'
      type='submit'
      variantColor='teal'
      onClick={handleClick}
    >
      Add exercise
    </Button>
  )
})
