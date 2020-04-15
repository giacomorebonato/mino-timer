import { Box, Button, Flex } from '@chakra-ui/core'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../hooks/useStore'

export const TimerActions = () => {
  const store = useStore()

  return useObserver(() =>
    store.rounds.size ? (
      <Box mt='2'>
        <Flex>
          <Button
            isDisabled={store.idle}
            flex='1'
            type='button'
            variantColor='teal'
            onClick={() => store.startExercise()}
          >
            Start
          </Button>
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
          <Button
            isDisabled={store.idle}
            flex='1'
            type='button'
            onClick={() => store.clearTimers()}
          >
            Clear
          </Button>
        </Flex>
      </Box>
    ) : null
  )
}
