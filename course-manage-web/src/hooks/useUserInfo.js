import { useContext } from 'react'
import { MovileContext } from '../contexts/MovileContext'
import { LoginContext } from '../contexts/LoginContext'

export function useUserInfo() {
  const { isMovile } = useContext(MovileContext)
  const { getLogin, removeLogin } = useContext(LoginContext)
  const user = getLogin()?.user.preceptor

  return { isMovile, user, removeLogin }
}
