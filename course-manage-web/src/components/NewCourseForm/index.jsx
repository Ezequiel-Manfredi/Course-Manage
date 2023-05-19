import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoginContext } from '../../contexts/LoginContext'
import { CourseContext } from '../../contexts/CourseContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { courseSchema } from '../../validators/courseSchema'
import { createCourse } from '../../services/courseApi'
import { RESPONSE, dateFormat } from '../../utils/constants'

export default function NewCourseForm() {
  const { login } = useContext(LoginContext)
  const { school, reloadCourses } = useContext(CourseContext)
  const [hiddenModal, sethiddenModal] = useState(true)
  const {
    register, handleSubmit,
    formState: { errors },
    setError, reset
  } = useForm({ resolver: yupResolver(courseSchema) })

  const submit = ({ year, ...data }) => {
    const body = {
      ...data,
      createdAt: dateFormat({ year })
    }
    createCourse(({ status, body }) => {
      if (status === RESPONSE.BAD_REQUEST) body.errors.map((err) => setError(err.field))
      if (status === RESPONSE.CREATED) {
        sethiddenModal(!hiddenModal)
        reloadCourses()
        reset()
      }
    }, body, login)
  }

  const handleClick = () => sethiddenModal(!hiddenModal)

  return (
    <>
      <button onClick={handleClick}>Nuevo Curso</button>
      <form hidden={hiddenModal} onSubmit={handleSubmit(submit)}>
        <h2>Nuevo Curso</h2>
        <label>
          Nombre del curso:
          <input type="text" placeholder='curso 3ro3ra'
            name="name" required {...register('name')} autoComplete='off'
          />
          <p>{errors.name && 'Nombre invalido'}</p>
        </label>
        <label>
          Año de inicio del curso:
          <input type="text" pattern='\d{4}' required name="year"
            placeholder='2020' autoComplete='off'
            {...register('year')}
          />
          <p>{errors.createdAt && 'Año de inicio invalido'}</p>
        </label>
        <input type="number" hidden
          value={login.user.preceptor.id} name="preceptorId"
          {...register('preceptorId')}
        />
        <input type="number" hidden
          value={school?.id} name="schoolId"
          {...register('schoolId')}
        />
        <button>Crear Curso</button>
      </form>
    </>
  )
}
