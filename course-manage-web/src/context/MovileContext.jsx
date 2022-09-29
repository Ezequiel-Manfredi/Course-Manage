import { createContext, useState, useEffect } from 'react'

export const MovileContext = createContext({})

export const MovileContextProvider = ({ children }) => {
  const [size, setSize] = useState(window.innerWidth)
  const isMovile = size < 500

  useEffect(() => window.addEventListener('resize', () => { setSize(window.innerWidth) }), [])

  return (
    <MovileContext.Provider value={{ isMovile }}>
      {children}
    </MovileContext.Provider>
  )
}
