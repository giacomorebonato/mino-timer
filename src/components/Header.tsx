import { Box, Flex, Heading, Link as ChakraLink } from '@chakra-ui/react'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

declare module '@chakra-ui/react' {
  interface ILink {
    as: NavLink
  }
}

export const Header: React.FC = (props) => {
  const MyLink = ChakraLink as any
  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      padding='1rem'
      bg='teal.500'
      color='white'
      {...props}
    >
      <Flex align='center' mr={5}>
        <Heading as='h1' size='lg' letterSpacing={'-.1rem'}>
          <Link to='/'>Mino Timer</Link>
        </Heading>
      </Flex>
      <Box display='flex' width='auto' alignItems='center' flexGrow={1}>
        <MyLink as={NavLink} to='/about'>
          About
        </MyLink>
        <MyLink as={NavLink} to='/feedback' ml='4'>
          Feedback
        </MyLink>
      </Box>
    </Flex>
  )
}
