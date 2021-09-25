import { Box, Button, Flex } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { FaPause } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import { useStore } from '../../hooks/useStore'
import { StartExerciseButton } from './StartExerciseButton'

export const TimerActions = observer(() => {
  const { round, timer } = useStore()

  if (!round.rounds.size) return null

  return (
    <Box mt='2'>
      <Flex>
        <StartExerciseButton
          isDisabled={timer.idle}
          onClick={() => {
            timer.startPerformance()
          }}
        />

        <Button
          isDisabled={!timer.idle}
          flex='1'
          leftIcon={<FaPause />}
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
          leftIcon={<MdCancel />}
          flex='1'
          type='button'
          onClick={() => round.rounds.clear()}
        >
          Clear
        </Button>
      </Flex>
    </Box>
  )
})
