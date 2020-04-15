import { Button } from '@chakra-ui/core'
import { useObserver } from 'mobx-react-lite'
import NoSleep from 'nosleep.js'
import React, { useCallback, useRef } from 'react'
import * as Tone from 'tone'

export const AddExerciseButton = React.memo(() => {
  const isFirstClick = useRef(true)
  const handleClick = useCallback(() => {
    if (!isFirstClick.current) return

    // This button silently triggers consent for
    // * speech synthesis
    // * screen awake
    Tone.start()
    const ssu = new SpeechSynthesisUtterance('')
    const noSleep = new NoSleep()
    noSleep.enable()
    speechSynthesis.speak(ssu)

    isFirstClick.current = false
  }, [])

  return useObserver(() => (
    <Button
      id='ios-speak'
      type='submit'
      variantColor='teal'
      onClick={handleClick}
    >
      Add exercise
    </Button>
  ))
})
