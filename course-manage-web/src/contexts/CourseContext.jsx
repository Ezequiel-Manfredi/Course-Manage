import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COURSE, RESPONSE, ROUTES, STORAGE_KEY } from '../utils/constants'
import { LoginContext } from './LoginContext'
import { getCourses } from '../services/courseApi'

export const CourseContext = createContext()

export const CourseProvider = ({ children, queryParams }) => {
  const navigator = useNavigate()
  const [refresh, setRefresh] = useState(false)
  const { login } = useContext(LoginContext)
  const [courses, setCourses] = useState([])
  const [{ page, size }, setPagination] = useState({
    page: queryParams.get('page') || COURSE.INITIAL_PAGE,
    size: queryParams.get('size') || COURSE.INITIAL_SIZE
  })

  const reloadCourses = () => setRefresh(!refresh)

  const changePagination = (page, size) => {
    setPagination({ page, size })
  }

  const getSchool = () => {
    const schoolData = localStorage.getItem(STORAGE_KEY.SCHOOL)
    return JSON.parse(schoolData)
  }

  const [school, setSchool] = useState(getSchool() || {})

  const saveSchool = (newSchool) => {
    localStorage.setItem(STORAGE_KEY.SCHOOL, JSON.stringify(newSchool))
    setSchool(newSchool)
  }

  const removeSchool = () => {
    localStorage.removeItem(STORAGE_KEY.SCHOOL)
    setSchool({})
  }

  useEffect(() => {
    if (!Object.keys(school).length) return

    getCourses(({ status, body: { results } }) => {
      if (status === RESPONSE.UNAUTHORIZED) navigator(ROUTES.LOGIN)
      if (status === RESPONSE.OK) setCourses(results)
    }, page, size, school.id, login)
  }, [page, size, school, refresh])

  return (
    <CourseContext.Provider value={{
      courses,
      changePagination,
      school,
      saveSchool,
      removeSchool,
      reloadCourses
    }}>
      {children}
    </CourseContext.Provider>
  )
}
