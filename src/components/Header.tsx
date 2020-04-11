import { Box, Flex, Heading, Text } from '@chakra-ui/core'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const MenuItems: React.FC = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display='block'>
    {children}
  </Text>
)

export const Header: React.FC = (props) => {
  const [show, setShow] = React.useState(false)
  const handleToggle = () => setShow(!show)

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

      <Box display={{ sm: 'block', md: 'none' }} onClick={handleToggle}>
        <svg
          fill='white'
          width='12px'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <title>Menu</title>
          <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'flex', xs: 'none' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems='center'
        flexGrow={1}
      >
        <MenuItems>
          <NavLink to='/about'>About</NavLink>
        </MenuItems>
      </Box>
    </Flex>
  )
}
