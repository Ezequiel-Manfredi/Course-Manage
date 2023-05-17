import { useCallback, useContext, useEffect, useState } from 'react'
import { CourseContext } from '../contexts/CourseContext'
import { LoginContext } from '../contexts/LoginContext'
import { searchSchools } from '../services/schoolApi'
import { debounce } from '../utils/debounce'
import { EMPTY, MINIMUM_SEARCH_LENGTH, NULL_VALUE } from '../utils/constants'

export function useSchool() {
  const { login } = useContext(LoginContext)
  const { school, removeSchool } = useContext(CourseContext)
  const [schoolSearch, setSchoolSearch] = useState(school?.name || EMPTY)
  const [schools, setSchools] = useState(NULL_VALUE)

  const delayedSearch = useCallback(debounce((value) => {
    const response = ({ body: { results } }) => {
      setSchools(results)
    }

    // manejar el error para la longitud minima requerida
    const error = (err) => {
      console.error(err)
    }

    searchSchools(response, error, value, login)
  }), [])

  const handleSeach = (value) => {
    if (value === EMPTY) return removeSchool()
    if (value.length >= MINIMUM_SEARCH_LENGTH) delayedSearch(value)
    else setSchools(NULL_VALUE)
  }

  useEffect(() => {
    setSchoolSearch(school?.name || EMPTY)
  }, [school])

  return {
    schoolSearch,
    setSchoolSearch,
    schools,
    handleSeach
  }
}
