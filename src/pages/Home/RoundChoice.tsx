import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../hooks/useStore'

const rounds: RoundId[] = [1, 2, 3, 4, 5]

export const RoundChoice = observer(() => {
  const store = useStore()

  return (
    <FormControl mb='2'>
      <FormLabel htmlFor='destination-round'>Destination round</FormLabel>
      <Select
        id='destination-round'
        value={store.exercise.newExercise.round}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const destinationRound = parseInt(e.target.value) as RoundId

          store.exercise.changeDestinationRound(destinationRound)
        }}
      >
        {rounds.map((round) => (
          <option key={`destination-round-${round}`} value={round}>
            Round {round}
          </option>
        ))}
      </Select>
    </FormControl>
  )
})
