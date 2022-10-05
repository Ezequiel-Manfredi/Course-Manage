import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MovileContext } from '../../contexts/MovileContext'
import { LoginContext } from '../../contexts/LoginContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../../validators/Schemas'
import { createApi } from '../../services/apiCall'
import { BAD_REQUEST, OK } from '../../utils/constants'
import './style.css'

export default function Login() {
  const navigator = useNavigate()
  const { isMovile } = useContext(MovileContext)
  const { saveLogin, getLogin } = useContext(LoginContext)
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const submit = (data) => {
    createApi('/login', 'POST', { ...data })
      .then(({ status, body }) => {
        if (status === BAD_REQUEST) body.errors.map((err) => setError(err.field))
        if (status === OK) {
          saveLogin(body)
        }
      })
  }

  useEffect(() => {
    const loginData = getLogin()
    if (loginData) {
      if (!loginData.user.preceptor) navigator('/create-preceptor')
      else navigator('/courses')
    }
  })

  return (
    <form
      className={`login-form ${isMovile ? 'login-movile' : ''}`}
      onSubmit={handleSubmit(submit)}
    >
      <h2>Inicio de Sesión</h2>
      <label>
        <input required type="email" placeholder='Correo Electronico'
          name="email" {...register('email')} autoComplete='off'
        />
      </label>
      <label>
        <input required type="password" placeholder='Contraseña'
          name="password" {...register('password')}
        />
      </label>
      <p>{(errors.email || errors.password) && 'Correo o Contraseña invalidos'}</p>
      <button>Iniciar Sesión</button>
    </form>
  )
}
