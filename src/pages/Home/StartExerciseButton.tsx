import { Button } from '@chakra-ui/core'
import NoSleep from 'nosleep.js'
import React, { useCallback, useRef } from 'react'
import * as Tone from 'tone'

interface StartExerciseButtonProps {
  isDisabled: boolean
  onClick: () => void
}

export const StartExerciseButton: React.FC<StartExerciseButtonProps> = React.memo(
  ({ isDisabled, onClick }) => {
    const isFirstClick = useRef(true)
    const handleClick = useCallback((e: React.MouseEvent<any, MouseEvent>) => {
      onClick && onClick()
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <Button
        isDisabled={isDisabled}
        flex='1'
        type='button'
        variantColor='teal'
        onClick={(e) => handleClick(e)}
      >
        Start
      </Button>
    )
  }
)
