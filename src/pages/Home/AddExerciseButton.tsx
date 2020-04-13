import { Button } from '@chakra-ui/core'
import NoSleep from 'nosleep.js'
import React from 'react'

export const AddExerciseButton = () => {
  return (
    <Button
      id='ios-speak'
      type='submit'
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
  )
}
