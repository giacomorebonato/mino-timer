import { Box, Button, Flex } from '@chakra-ui/core'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { FaPause } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import { useStore } from '../../hooks/useStore'
import { StartExerciseButton } from './StartExerciseButton'

export const TimerActions = () => {
  const { round, timer } = useStore()

  return useObserver(() =>
    round.rounds.size ? (
      <Box mt='2'>
        <Flex>
          <StartExerciseButton
            isDisabled={timer.idle}
            onClick={() => {
              timer.startExercise()
            }}
          />

          <Button
            isDisabled={!timer.idle}
            flex='1'
            leftIcon={FaPause}
            type='button'
            ml='1'
            mr='1'
            onClick={() => {
              timer.stopPerformance()
            }}
          >
            Pause
          </Button>
          <Button
            backgroundColor='red.200'
            _hover={{
              backgroundColor: 'red.400'
            }}
            leftIcon={MdCancel}
            flex='1'
            type='button'
            onClick={() => timer.clearPerformance()}
          >
            Clear
          </Button>
        </Flex>
      </Box>
    ) : null
  )
}
