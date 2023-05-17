import { createContext, useState } from 'react'
import { STORAGE_KEY } from '../utils/constants'

export const CourseContext = createContext()

export const CourseProvider = ({ children }) => {
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

  return (
    <CourseContext.Provider value={{
      school,
      saveSchool,
      removeSchool
    }}>
      {children}
    </CourseContext.Provider>
  )
}
