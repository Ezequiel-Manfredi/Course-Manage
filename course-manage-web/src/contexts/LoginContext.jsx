import { createContext, useState } from 'react'

export const LoginContext = createContext()

export const LoginProvider = ({ children }) => {
  const [login, setlogin] = useState(null)

  const getLogin = () => {
    const loginString = localStorage.getItem('loginData')
    const userLogin = JSON.parse(loginString)
    return userLogin
  }

  const saveLogin = (userLogin) => {
    localStorage.setItem('loginData', JSON.stringify(userLogin))
    setlogin(userLogin)
  }

  const removeLogin = () => {
    localStorage.removeItem('loginData')
    setlogin(null)
  }

  return (
      <LoginContext.Provider value={ { getLogin, login, setlogin, saveLogin, removeLogin } }>
        {children}
      </LoginContext.Provider>
  )
}
