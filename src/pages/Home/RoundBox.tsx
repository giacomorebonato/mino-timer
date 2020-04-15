import { Box, Text } from '@chakra-ui/core'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { Timer } from '../../components/Timer'

interface RoundBoxProps {
  round: RoundData
}

export const RoundBox: React.FC<RoundBoxProps> = ({ round }) => {
  return useObserver(() => (
    <Box mt='2'>
      <Text>Round {round.id}</Text>
      {round.exercises.map((e) => (
        <Timer
          recoveryTime={e.recoveryTime}
          exerciseTime={e.exerciseTime}
          recoverySecondsLeft={e.recoverySecondsLeft}
          secondsLeft={e.secondsLeft}
          key={`${round.id}-round-${e.id}`}
          name={e.name}
        />
      ))}
    </Box>
  ))
}
