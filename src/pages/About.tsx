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
        Web pages have more and more functionalities that make them close to
        native mobile application. This project started as an exercise and then,
        since I am doing exercise by myself at home in these days, I started to
        make it good.
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
    </Stack>
  )
}
