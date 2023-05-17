import { useSearchParams } from 'react-router-dom'
import NavigationPanel from '../../components/NavigationPanel'
import { CourseProvider } from '../../contexts/CourseContext'
import { SchoolForm } from '../../components/SchoolForm'
import CourseList from '../../components/CourseList'

export default function Courses() {
  const [queryParams] = useSearchParams()

  return (
    <NavigationPanel>
    <CourseProvider queryParams={queryParams}>
      <SchoolForm/>
      <CourseList/>
    </CourseProvider>
    </NavigationPanel>
  )
}
