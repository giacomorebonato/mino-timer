import { Link, Stack, Text } from '@chakra-ui/core'
import React from 'react'

export const About: React.FC = () => {
  return (
    <Stack as='main' maxWidth='800px' mx='auto' p='4'>
      <Text as='h1' fontSize='xl' fontWeight='bold'>
        About
      </Text>

      <Text as='h2' fontSize='lg' fontWeight='bold'>
        Features
      </Text>
      <Text>
        Mino-Timer is a timer for your home workout. It's free, without ads and
        it'll always stay like this.
      </Text>

      <Text as='h2' fontSize='lg' fontWeight='bold'>
        Why Mino-Timer?
      </Text>
      <Text>
        Web pages can be pushed to be close to native applications. This project
        started as a programming exercise and then I started to use it for
        physical exercise too.
      </Text>

      <Text as='h2' fontSize='lg' fontWeight='bold'>
        Mino-Timer is a PWA
      </Text>
      <Text>
        PWA means "Progressive Web App". To take advantage of this you should
        add the web page to your home screen. You can do this on both{' '}
        <Link
          fontWeight='bold'
          href='https://osxdaily.com/2020/02/26/add-website-home-screen-iphone-ipad/'
        >
          iOS
        </Link>{' '}
        and{' '}
        <Link
          fontWeight='bold'
          href='https://www.businessinsider.com/how-to-add-widgets-android'
        >
          Android
        </Link>
        . This will ensure that the screen will stay awake while the timer is
        running and you'll hear the audio notifications.
      </Text>
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
          margin: '20px auto',
          maxWidth: '100%',
          maxHeight: '100vh',
          height: '490px'
        }}
        allowFullScreen
      >
        {' '}
      </iframe>
    </Stack>
  )
}
