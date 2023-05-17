import { Link } from 'react-router-dom'

export default function CourseItem({ id, name }) {
  return (
    <li>
      <Link to={`/courses/${id}`}>{name}</Link>
    </li>
  )
}
