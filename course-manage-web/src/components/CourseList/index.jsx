import { useCourseList } from '../../hooks/useCourseList'

export default function CourseList() {
  const { coursesList } = useCourseList()

  return (
    <section>
      <h2>Mis Cursos</h2>
      <ul>
        {coursesList}
      </ul>
    </section>
  )
}
