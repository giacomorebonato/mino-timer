import { CSSReset, ThemeProvider } from '@chakra-ui/core'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Header } from './components/Header'
import { StoreProvider } from './hooks/useStore'
import { About, Home } from './pages'
import { customTheme } from './theme'

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <ThemeProvider theme={customTheme}>
          <CSSReset />
          <Header />
          <Switch>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </ThemeProvider>
      </Router>
    </StoreProvider>
  )
}

export default App
