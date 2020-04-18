import { useLocalStore } from 'mobx-react-lite'
import React from 'react'
import { createStore, TStore } from '../createStore'

const storeContext = React.createContext<TStore | null>(null)

export const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(createStore)

  return <storeContext.Provider value={store}>{children}</storeContext.Provider>
}

export const useStore = () => {
  const store = React.useContext(storeContext)
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store
}
