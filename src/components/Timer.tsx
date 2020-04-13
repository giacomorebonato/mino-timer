import { Box, Flex, Text } from '@chakra-ui/core'
import React from 'react'

type TimerProps = Omit<ExerciseData, 'id'>

export const Timer: React.FC<TimerProps> = ({
  name,
  recoverySecondsLeft,
  secondsLeft,
  start
}) => {
  return (
    <Box
      rounded='sm'
      borderWidth='1px'
      mt='1'
      p='2'
      borderColor={start ? 'green.400' : 'gray.400'}
    >
      <Flex flexDirection='row'>
        <Box flex='1'>
          <Text fontWeight='bold'>{name}</Text>
        </Box>
        <Box flex='1'>
          <Text textAlign='right'>{secondsLeft}</Text>
        </Box>
      </Flex>
      <Flex flexDirection='row'>
        <Box flex='1'>
          <Text fontWeight='bold'>Rest</Text>
        </Box>
        <Box flex='1'>
          <Text textAlign='right'>{recoverySecondsLeft}</Text>
        </Box>
      </Flex>
    </Box>
  )
}
