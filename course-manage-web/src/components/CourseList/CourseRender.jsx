import { Link } from 'react-router-dom'

export function CourseItem({ id, name }) {
  return (
    <li>
      <Link to={`/courses/${id}`}>{name}</Link>
    </li>
  )
}

export function CoursesByYear({ year, courses }) {
  return (
    <li>
      <h3>Año: {year}</h3>
      <ul>
        {courses}
      </ul>
    </li>
  )
}
