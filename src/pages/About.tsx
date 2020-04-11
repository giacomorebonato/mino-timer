import { Stack, Text } from '@chakra-ui/core'
import React from 'react'

export const About: React.FC = () => {
  return (
    <Stack as='main' maxWidth='800px' mx='auto' p='4'>
      <Text as='h1' fontSize='lg'>
        About
      </Text>
      <Text>
        I created Mino-Timer as an exercise for both coding and physical
        activity during COVID19 quarantine.
      </Text>
    </Stack>
  )
}
