import { Stack } from '@chakra-ui/core'
import React from 'react'

export const Feedback: React.FC = () => {
  return (
    <Stack as='main' maxWidth='800px' mx='auto' p='4'>
      <iframe
        title='feedback'
        width='640px'
        height='480px'
        src='https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAK7RPMFUN0o5SVJORU1HQzIzUDFZTlUyNzlNUktZUC4u&embed=true'
        frameBorder='0'
        marginWidth={0}
        marginHeight={0}
        style={{
          border: 'none',
          maxWidth: '100%',
          maxHeight: '100vh'
        }}
        allowFullScreen
      >
        {' '}
      </iframe>
    </Stack>
  )
}
