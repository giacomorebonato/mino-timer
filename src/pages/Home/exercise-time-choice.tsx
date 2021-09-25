import { FormControl, FormLabel } from '@chakra-ui/react'
import React from 'react'
import { TimeSelect } from '../../components'
import { useExercise } from '../../store/exercise-atom'

export const ExerciseTimeChoice = () => {
  const { exercise, editExercise } = useExercise()

  return (
    <FormControl mb='2'>
      <FormLabel htmlFor='exercise-time'>
        Exercise time: {exercise.exerciseTime} seconds
      </FormLabel>
      <TimeSelect
        id='exercise-time'
        value={exercise.exerciseTime}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const parsedSeconds = parseInt(e.target.value)
          const exerciseTime = isNaN(parsedSeconds) ? 0 : parsedSeconds

          editExercise({
            secondsLeft: exerciseTime,
            exerciseTime
          })
        }}
      />
    </FormControl>
  )
}
