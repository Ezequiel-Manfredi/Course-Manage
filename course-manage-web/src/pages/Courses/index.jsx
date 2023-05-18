import { useSearchParams } from 'react-router-dom'
import { CourseProvider } from '../../contexts/CourseContext'
import { SchoolForm } from '../../components/SchoolForm'
import CourseList from '../../components/CourseList'
import NewCourseForm from '../../components/NewCourseForm'

export default function Courses() {
  const [queryParams] = useSearchParams()

  return (
    <CourseProvider queryParams={queryParams}>
      <SchoolForm/>
      <CourseList/>
      <NewCourseForm/>
    </CourseProvider>
  )
}
