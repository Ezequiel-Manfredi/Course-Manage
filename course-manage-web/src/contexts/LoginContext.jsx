import { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const LoginContext = createContext()

export const LoginProvider = ({ children }) => {
  const navigator = useNavigate()
  const location = useLocation()
  const pathExcept = ['/login', '/register']

  const getLogin = () => {
    const loginString = localStorage.getItem('loginData')
    const userLogin = JSON.parse(loginString)
    return userLogin
  }

  const [login, setlogin] = useState(getLogin())

  const saveLogin = (userLogin) => {
    localStorage.setItem('loginData', JSON.stringify(userLogin))
    setlogin(userLogin)
  }

  const removeLogin = () => {
    localStorage.removeItem('loginData')
    setlogin(null)
  }

  useEffect(() => {
    if (!login && !pathExcept.includes(location.pathname)) navigator('/login')
  }, [login, location])

  return (
      <LoginContext.Provider value={ { getLogin, login, setlogin, saveLogin, removeLogin } }>
        {children}
      </LoginContext.Provider>
  )
}
