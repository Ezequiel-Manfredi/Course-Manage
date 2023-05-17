import { useContext } from 'react'
import { MovileContext } from '../../contexts/MovileContext'
import { LoginContext } from '../../contexts/LoginContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../../validators/userSchema'
import { apiCall } from '../../services/apiCall'
import { ENDPOINT, METHOD, RESPONSE } from '../../utils/constants'
import './style.css'

export default function Login() {
  const { isMovile } = useContext(MovileContext)
  const { saveLogin } = useContext(LoginContext)
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const submit = (data) => {
    apiCall({ endpoit: ENDPOINT.LOGIN, method: METHOD.POST, body: { ...data } })
      .then(({ status, body }) => {
        if (status === RESPONSE.BAD_REQUEST) body.errors.map((err) => setError(err.field))
        if (status === RESPONSE.OK) {
          saveLogin(body)
        }
      })
  }

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
