import { Box, Button, ButtonGroup, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { FaAngleDown, FaAngleUp, FaRegTrashAlt } from 'react-icons/fa'

interface TimerProps extends ExerciseData {
  idle: boolean
  move: (direction: 'UP' | 'DOWN') => void
  onRemove: () => void
}

export const Timer: React.FC<TimerProps> = React.memo(
  ({ idle, move, name, recoverySecondsLeft, secondsLeft, onRemove }) => (
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
      {!idle && (
        <Flex mt='2'>
          <ButtonGroup spacing={1}>
            <Button
              onClick={() => {
                onRemove()
              }}
              size='sm'
              leftIcon={<FaRegTrashAlt />}
            >
              Remove
            </Button>
            <Button
              leftIcon={<FaAngleUp />}
              onClick={() => {
                move('UP')
              }}
              size='sm'
            >
              Move Up
            </Button>
            <Button
              onClick={() => {
                move('DOWN')
              }}
              leftIcon={<FaAngleDown />}
              size='sm'
            >
              Move down
            </Button>
          </ButtonGroup>
        </Flex>
      )}
    </Box>
  )
)
