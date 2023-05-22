import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useUserInfo } from '../../hooks/useUserInfo'
import { CourseContext } from '../../contexts/CourseContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { courseSchema } from '../../validators/courseSchema'
import { createCourse } from '../../services/courseApi'
import { NULL_VALUE, RESPONSE, dateFormat } from '../../utils/constants'

export default function NewCourseForm() {
  const { user, login, isMovile } = useUserInfo()
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
      createdAt: dateFormat({ year }),
      preceptorId: user.id,
      schoolId: school.id
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

  const stopPropagation = e => e.stopPropagation()

  if (!school.id) return NULL_VALUE
  return (
    <>
      <button onClick={handleClick}>
        <img src="/assets/create-course.svg"/>
      </button>
      <div
        onClick={handleClick} hidden={hiddenModal}
        className={`new-course ${isMovile ? 'new-course-movile' : ''}`}
      >
        <form onClick={stopPropagation} onSubmit={handleSubmit(submit)}>
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
            <input type="text" pattern='\d{4}' name="year"
              placeholder='2020' autoComplete='off'
              {...register('year')}
            />
            <p>{errors.createdAt && 'Año de inicio invalido'}</p>
          </label>
          <button>Crear Curso</button>
        </form>
      </div>
    </>
  )
}
