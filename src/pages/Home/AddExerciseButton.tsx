import { Button } from '@chakra-ui/core'
import { useObserver } from 'mobx-react-lite'
import NoSleep from 'nosleep.js'
import React from 'react'
import { useStore } from '../../hooks/useStore'

export const AddExerciseButton = () => {
  const store = useStore()

  return useObserver(() => (
    <Button
      id='ios-speak'
      type='submit'
      isDisabled={store.idle}
      variantColor='teal'
      onClick={() => {
        // This button silently triggers consent for
        // * speech synthesis
        // * screen awake
        const ssu = new SpeechSynthesisUtterance('')
        const noSleep = new NoSleep()
        noSleep.enable()
        speechSynthesis.speak(ssu)
      }}
    >
      Add exercise
    </Button>
  ))
}
