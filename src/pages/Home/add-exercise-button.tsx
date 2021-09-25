import { Button } from '@chakra-ui/react'
import React from 'react'
import { MdFitnessCenter } from 'react-icons/md'

declare global {
  interface Navigator {
    wakeLock: any
  }
}

export const AddExerciseButton = React.memo(() => {
  return (
    <Button
      leftIcon={<MdFitnessCenter />}
      id='ios-speak'
      type='submit'
      colorScheme='teal'
    >
      Add exercise
    </Button>
  )
})
