import React from 'react'
import { RootStore } from '../store'

const storeContext = React.createContext<RootStore | null>(null)

export const StoreProvider: React.FC = ({ children }) => {
  const rootStore = new RootStore()

  return (
    <storeContext.Provider value={rootStore}>{children}</storeContext.Provider>
  )
}

export const useStore = () => {
  const store = React.useContext(storeContext)
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store
}
