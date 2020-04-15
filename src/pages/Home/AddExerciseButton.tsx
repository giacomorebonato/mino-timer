import { Button } from '@chakra-ui/core'
import { useObserver } from 'mobx-react-lite'
import NoSleep from 'nosleep.js'
import React, { useState } from 'react'
import * as Tone from 'tone'
import { useStore } from '../../hooks/useStore'

export const AddExerciseButton = () => {
  const [firstClick, setFirstClick] = useState(true)
  const store = useStore()

  return useObserver(() => (
    <Button
      id='ios-speak'
      type='submit'
      isDisabled={store.idle}
      variantColor='teal'
      onClick={() => {
        if (!firstClick) return

        if (firstClick) {
          // This button silently triggers consent for
          // * speech synthesis
          // * screen awake
          Tone.start()
          const ssu = new SpeechSynthesisUtterance('')
          const noSleep = new NoSleep()
          noSleep.enable()
          speechSynthesis.speak(ssu)
        } else {
          setFirstClick(false)
        }
      }}
    >
      Add exercise
    </Button>
  ))
}
