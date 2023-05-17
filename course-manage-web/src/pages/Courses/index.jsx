import NavigationPanel from '../../components/NavigationPanel'
import { CourseProvider } from '../../contexts/CourseContext'
import { SchoolForm } from '../../components/SchoolForm'

export default function Courses() {
  return (
    <NavigationPanel>
    <CourseProvider>
      <SchoolForm/>
    </CourseProvider>
    </NavigationPanel>
  )
}
