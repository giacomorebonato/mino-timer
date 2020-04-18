import { Box, Button, Flex } from '@chakra-ui/core'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../hooks/useStore'
import { StartExerciseButton } from './StartExerciseButton'

export const TimerActions = () => {
  const store = useStore()

  return useObserver(() =>
    store.rounds.size ? (
      <Box mt='2'>
        <Flex>
          <StartExerciseButton
            isDisabled={store.idle}
            onClick={() => {
              store.startExercise()
            }}
          />

          <Button
            flex='1'
            type='button'
            ml='1'
            mr='1'
            onClick={() => {
              store.stopExercise()
            }}
          >
            Pause
          </Button>
          <Button flex='1' type='button' onClick={() => store.clearTimers()}>
            Clear
          </Button>
        </Flex>
      </Box>
    ) : null
  )
}
