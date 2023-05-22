import { useContext } from 'react'
import { useCourseList } from '../../hooks/useCourseList'
import { CourseContext } from '../../contexts/CourseContext'
import { NULL_VALUE } from '../../utils/constants'

export default function CourseList() {
  const { school } = useContext(CourseContext)
  const { coursesList } = useCourseList()

  if (!school.id) return NULL_VALUE
  return (
    <section className='courses'>
      <h2>Mis Cursos</h2>
      <ul>
        {coursesList}
      </ul>
    </section>
  )
}
