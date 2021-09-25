import { FormControl, FormLabel } from '@chakra-ui/react'
import React from 'react'
import { TimeSelect } from '../../components'
import { useExercise } from '../../store/exercise-atom'

export const RecoveryTimeChoice = () => {
  const { exercise, editExercise } = useExercise()

  return (
    <FormControl mb='2'>
      <FormLabel htmlFor='recovery-time'>
        Recovery time: {exercise.recoveryTime} seconds
      </FormLabel>
      <TimeSelect
        id='recovery-time'
        value={exercise.recoveryTime}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const parsedSeconds = parseInt(e.target.value)
          const recoveryTime = isNaN(parsedSeconds) ? 0 : parsedSeconds

          editExercise({
            recoveryTime,
            recoverySecondsLeft: recoveryTime
          })
        }}
      />
    </FormControl>
  )
}
