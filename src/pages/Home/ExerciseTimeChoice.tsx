import { FormControl, FormLabel } from '@chakra-ui/core'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { TimeSelect } from '../../components'
import { useStore } from '../../hooks/useStore'

export const ExerciseTimeChoice = () => {
  const store = useStore()

  return useObserver(() => (
    <FormControl mb='2'>
      <FormLabel htmlFor='exercise-time'>
        Exercise time: {store.newExercise.exerciseTime} seconds
      </FormLabel>
      <TimeSelect
        id='exercise-time'
        value={store.newExercise.exerciseTime}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const parsedSeconds = parseInt(e.target.value)

          store.changeExerciseTime(isNaN(parsedSeconds) ? 0 : parsedSeconds)
        }}
      />
    </FormControl>
  ))
}
