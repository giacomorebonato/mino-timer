import { FormControl, FormLabel } from '@chakra-ui/core'
import React from 'react'
import { TimeSelect } from '../../components'
import { useStore } from '../../hooks/useStore'

export const RecoveryTimeChoice = () => {
  const store = useStore()

  return (
    <FormControl mb='2'>
      <FormLabel htmlFor='recovery-time'>
        Recovery time: {store.newExercise.recoveryTime} seconds
      </FormLabel>
      <TimeSelect
        id='recovery-time'
        value={store.newExercise.recoveryTime}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const parsedSeconds = parseInt(e.target.value)

          store.changeRecoveryTime(isNaN(parsedSeconds) ? 0 : parsedSeconds)
        }}
      />
    </FormControl>
  )
}
