import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema } from '../../validators/Schemas'
import { createApi } from '../../services/apiCall'
import { BAD_REQUEST, CREATED } from '../../utils/constants'

export default function Register() {
  const [isRegisted, setRegisted] = useState(false)
  const navigator = useNavigate()
  const { register, handleSubmit, formState: { errors }, setValue, setError } = useForm({
    resolver: yupResolver(userSchema)
  })

  const submit = (data) => {
    createApi('/users', 'POST', { ...data, role: 'preceptor' })
      .then(({ status, body: { errors } }) => {
        if (status === BAD_REQUEST) errors.map((err) => setError(err.field))
        if (status === CREATED) setRegisted(true)
      })
  }

  if (isRegisted) navigator('/login')

  return (
    <form onSubmit={handleSubmit(submit)}>
      <label>
        <input type="email" placeholder='Correo Electronico:'
          name="email" {...register('email')}
        />
        <p>{errors.email && 'Debe ser un email válido'}</p>
      </label>
      <label>
        <input type="password" placeholder='Contraseña:'
          name="password" {...register('password')}
        />
        <p>{errors.password && 'Debe tener un mínimo de 8 caracteres'}</p>
      </label>
      <label>
        <input type="password" placeholder='Confirmar Contraseña:'
          name="passwordConfirmation" {...register('passwordConfirmation')}
        />
        <p>{errors.passwordConfirmation && 'Debe coincidir con el campo Contraseña'}</p>
      </label>
      <label>
        Rol:
        <select name="role" {...register('role')}
         onChange={(e) => setValue('role', e.target.value, { shouldValidate: true })}
        >
          <option value='' selected>--Selecciona--</option>
          <option value="preceptor">Preceptor</option>
        </select>
        <p>{errors.role && 'Role invalido'}</p>
      </label>
      <button>Registrarse</button>
    </form>
  )
}
