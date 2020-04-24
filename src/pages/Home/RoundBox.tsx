import { Box, Text } from '@chakra-ui/core'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { Timer } from '../../components/Timer'
import { useStore } from '../../hooks/useStore'

interface RoundBoxProps {
  round: RoundData
}

export const RoundBox: React.FC<RoundBoxProps> = ({ round }) => {
  const store = useStore()

  return useObserver(() => (
    <Box mt='2'>
      <Text>Round {round.id}</Text>
      {round.exercises.map((exercise) => (
        <Timer
          idle={store.timer.idle}
          key={`${round.id}-round-${exercise.id}`}
          move={(direction: 'DOWN' | 'UP') => {
            store.round.moveExercise(round.id, exercise.id, direction)
          }}
          onRemove={() => {
            store.round.removeExercise(round.id, exercise.id)
          }}
          {...exercise}
        />
      ))}
    </Box>
  ))
}
