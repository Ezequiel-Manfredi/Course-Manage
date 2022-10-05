import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MovileContext } from '../../contexts/MovileContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema } from '../../validators/userSchema'
import { apiCall } from '../../services/apiCall'
import { BAD_REQUEST, CREATED } from '../../utils/constants'
import './style.css'

export default function Register() {
  const [isRegisted, setRegisted] = useState(false)
  const navigator = useNavigate()
  const { isMovile } = useContext(MovileContext)
  const { register, handleSubmit, formState: { errors }, setValue, setError } = useForm({
    resolver: yupResolver(userSchema)
  })

  const submit = (data) => {
    apiCall('/users', 'POST', { ...data, role: 'preceptor' })
      .then(({ status, body: { errors } }) => {
        if (status === BAD_REQUEST) errors.map((err) => setError(err.field))
        if (status === CREATED) setRegisted(true)
      })
  }

  if (isRegisted) navigator('/login')

  return (
    <form
      className={`register-form ${isMovile ? 'register-movile' : ''}`}
      onSubmit={handleSubmit(submit)}
    >
      <h2>Registrar usuario</h2>
      <label>
        <input required type="email" placeholder='Correo Electronico'
          name="email" {...register('email')} autoComplete='off'
        />
        <p>{errors.email && 'Debe ser un email válido'}</p>
      </label>
      <label>
        <input required type="password" placeholder='Contraseña'
          name="password" {...register('password')}
        />
        <p>{errors.password && 'Debe tener un mínimo de 8 caracteres'}</p>
      </label>
      <label>
        <input required type="password" placeholder='Confirmar Contraseña'
          name="passwordConfirmation" {...register('passwordConfirmation')}
        />
        <p>{errors.passwordConfirmation && 'Debe coincidir con el campo Contraseña'}</p>
      </label>
      <label>
        <select required name="role" {...register('role')} defaultValue=''
         onChange={(e) => setValue('role', e.target.value, { shouldValidate: true })}
        >
          <option value=''>--Seleccionar Rol--</option>
          <option value="preceptor">Preceptor</option>
        </select>
        <p>{errors.role && 'Role invalido'}</p>
      </label>
      <button>Registrarse</button>
    </form>
  )
}
