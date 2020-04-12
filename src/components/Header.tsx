import { Box, Flex, Heading } from '@chakra-ui/core'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Header: React.FC = (props) => {
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
        <NavLink to='/about'>About</NavLink>
      </Box>
    </Flex>
  )
}
