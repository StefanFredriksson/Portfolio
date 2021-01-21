import React, { useState } from 'react'
import { globalState } from './State'

export const StateContext = React.createContext(globalState)

const Store = ({ children }) => {
  const [state, setState] = useState(globalState)

  return (
    <StateContext.Provider value={[state, setState]}>
      {children}
    </StateContext.Provider>
  )
}

export default Store
