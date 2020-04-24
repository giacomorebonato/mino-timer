import { FormControl, FormLabel } from '@chakra-ui/core'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { TimeSelect } from '../../components'
import { useStore } from '../../hooks/useStore'

export const ExerciseTimeChoice = () => {
  const { exercise } = useStore()

  return useObserver(() => (
    <FormControl mb='2'>
      <FormLabel htmlFor='exercise-time'>
        Exercise time: {exercise.newExercise.exerciseTime} seconds
      </FormLabel>
      <TimeSelect
        id='exercise-time'
        value={exercise.newExercise.exerciseTime}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const parsedSeconds = parseInt(e.target.value)

          exercise.changeExerciseTime(isNaN(parsedSeconds) ? 0 : parsedSeconds)
        }}
      />
    </FormControl>
  ))
}
