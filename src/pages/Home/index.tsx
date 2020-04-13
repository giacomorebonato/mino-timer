import { Box, Stack, Text } from '@chakra-ui/core'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { Timer } from '../../components'
import { useStore } from '../../hooks/useStore'
import { AddExerciseButton } from './AddExerciseButton'
import { ExerciseChoice } from './ExerciseChoice'
import { ExerciseTimeChoice } from './ExerciseTimeChoice'
import { RecoveryTimeChoice } from './RecoveryTimeChoice'
import { TimerActions } from './TimerActions'

export const Home: React.FC = () => {
  const store = useStore()

  return useObserver(() => (
    <Stack as='main' maxWidth='800px' mx='auto' p='4'>
      <Text fontSize='2em'>Create your timer</Text>
      <Box>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            store.addTimer()
          }}
        >
          <ExerciseChoice />
          <ExerciseTimeChoice />
          <RecoveryTimeChoice />
          <AddExerciseButton />
        </form>
        <Box mt='2'>
          {store.timers.map((timer) => (
            <Timer
              recoveryTime={timer.recoveryTime}
              exerciseTime={timer.exerciseTime}
              recoverySecondsLeft={timer.recoverySecondsLeft}
              secondsLeft={timer.secondsLeft}
              key={`${timer.id}-timer`}
              start={timer.start}
              name={timer.name}
            />
          ))}
        </Box>
        <TimerActions />
      </Box>
    </Stack>
  ))
}
