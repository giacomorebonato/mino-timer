import { Button } from '@chakra-ui/core'
import React from 'react'

declare global {
  interface Navigator {
    wakeLock: any
  }
}

export const AddExerciseButton = React.memo(() => {
  return (
    <Button id='ios-speak' type='submit' variantColor='teal'>
      Add exercise
    </Button>
  )
})
