import { Box, Flex, Text } from '@chakra-ui/core'
import React from 'react'

interface TimerProps {
  name: string
  seconds: number
  secondsLeft: number
  start: boolean
}

export const Timer: React.FC<TimerProps> = ({ name, secondsLeft, start }) => {
  return (
    <Box
      rounded='sm'
      borderWidth='2px'
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
    </Box>
  )
}
