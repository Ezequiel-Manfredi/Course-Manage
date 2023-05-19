import { useContext } from 'react'
import { CourseContext } from '../contexts/CourseContext'
import { NULL_VALUE } from '../utils/constants'
import { CourseItem, CoursesByYear } from '../components/CourseList/CourseRender'

export function useCourseList() {
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
      <CoursesByYear key={`${year} - ${index}`} year={year} courses={courses}/>
    ))

  return { coursesList }
}
