import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Header } from './components/Header'
import { StoreProvider } from './hooks/useStore'
import { About, Feedback, Home } from './pages'

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <StoreProvider>
        <Router>
          <Header />
          <Switch>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/feedback'>
              <Feedback />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Router>
      </StoreProvider>
    </ChakraProvider>
  )
}

export default App
