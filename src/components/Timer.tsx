import { Box, Button, Flex, Text } from '@chakra-ui/core'
import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'

interface TimerProps extends ExerciseData {
  onRemove: () => void
}

export const Timer: React.FC<TimerProps> = ({
  name,
  recoverySecondsLeft,
  secondsLeft,
  onRemove
}) => {
  return (
    <Box rounded='sm' borderWidth='1px' mt='1' p='2' borderColor='gray.400'>
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
      <Flex>
        <Button
          onClick={() => {
            onRemove()
          }}
          color='red'
          size='sm'
          leftIcon={FaRegTrashAlt}
        >
          Remove
        </Button>
      </Flex>
    </Box>
  )
}
