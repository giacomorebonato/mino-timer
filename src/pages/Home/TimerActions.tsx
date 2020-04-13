import { Box, Button, Flex } from '@chakra-ui/core'
import React from 'react'
import { useStore } from '../../hooks/useStore'

export const TimerActions = () => {
  const store = useStore()

  if (!store.timers.length) return null

  return (
    <Box mt='2'>
      <Flex>
        <Button
          isDisabled={store.idle}
          flex='1'
          type='button'
          variantColor='teal'
          onClick={() => store.startTimer()}
        >
          Start
        </Button>
        <Button
          flex='1'
          type='button'
          ml='1'
          mr='1'
          onClick={() => {
            store.stopTimers()
          }}
        >
          Pause
        </Button>
        <Button flex='1' type='button' onClick={() => store.clearTimers()}>
          Clear
        </Button>
      </Flex>
    </Box>
  )
}
