import { useContext } from 'react'
import { CourseContext } from '../../contexts/CourseContext'
import { NULL_VALUE } from '../../utils/constants'
import CourseItem from './CourseItem'

export default function CourseList() {
  const { courses = NULL_VALUE } = useContext(CourseContext)

  const coursesByYears = courses?.reduce((byYears, { id, name, createdAt }) => {
    const year = createdAt.split('-')[0]
    if (!byYears[year]) {
      byYears[year] = [<CourseItem key={id} id={id} name={name}/>]
    } else {
      byYears[year].push(<CourseItem key={id} id={id} name={name}/>)
    }
    return byYears
  }, {})

  const coursesList = Object.entries(coursesByYears)
    .map(([year, courses], index) => (
      <li key={`${year} - ${index}`}>
        <h3>Año: {year}</h3>
        <ul>
          {courses}
        </ul>
      </li>
    ))

  return (
    <section>
      <h2>Mis Cursos</h2>
      <ul>
        {coursesList}
      </ul>
    </section>
  )
}
