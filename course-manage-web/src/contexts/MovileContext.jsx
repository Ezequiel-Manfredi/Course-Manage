import { createContext, useState, useEffect } from 'react'
import { MOVILE_SIZE } from '../utils/constants'

export const MovileContext = createContext({})

export const MovileContextProvider = ({ children }) => {
  const [size, setSize] = useState(window.innerWidth)
  const isMovile = size < MOVILE_SIZE

  useEffect(() => window.addEventListener('resize', () => { setSize(window.innerWidth) }), [])

  return (
    <MovileContext.Provider value={{ isMovile }}>
      {children}
    </MovileContext.Provider>
  )
}
