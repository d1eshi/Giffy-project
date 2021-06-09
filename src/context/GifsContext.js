import React, { useState } from 'react'

// crear contexto
const Context = React.createContext({})

// crear un provider local
export function GifsContextProvider({ children }) {
  // crear un estado global en el provider
  const [gifs, setGifs] = useState([])

  return (
    <Context.Provider value={{ gifs, setGifs }}>{children}</Context.Provider>
  )
}

export default Context
