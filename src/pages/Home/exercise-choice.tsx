import { FormControl, FormLabel } from '@chakra-ui/react'
import React from 'react'
import { ExerciseSelect } from '../../components'
import { useExercise } from '../../store/exercise-atom'

export const ExerciseChoice = () => {
  const { exercise, editExercise } = useExercise()

  return (
    <FormControl mb='2'>
      <FormLabel htmlFor='exercise'>Exercise</FormLabel>
      <ExerciseSelect
        id='exercise'
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          editExercise({
            name: e.target.value
          })
        }}
        value={exercise.name}
      />
    </FormControl>
  )
}
