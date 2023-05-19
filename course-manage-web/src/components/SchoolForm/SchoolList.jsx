import { useContext, useEffect, useState } from 'react'
import { CourseContext } from '../../contexts/CourseContext'
import { SchoolItem } from './SchoolItem'
import { EMPTY_ARRAY, NULL_VALUE } from '../../utils/constants'

export function SchoolsList({ results }) {
  const { saveSchool } = useContext(CourseContext)
  const [schoolItems, setSchoolItems] = useState(NULL_VALUE)

  useEffect(() => {
    const handleSelection = ({ target: element }) => {
      saveSchool({
        id: element.dataset.id,
        name: element.dataset.name
      })
      setSchoolItems(NULL_VALUE)
    }

    setSchoolItems(results?.map(
      res => <SchoolItem handle={handleSelection} res={res} key={res.id}/>
    ) || NULL_VALUE)
  }, [results])

  if (!schoolItems) return NULL_VALUE
  return (
    <ul className='schools-modal'>
      {
      schoolItems?.length !== EMPTY_ARRAY
        ? schoolItems
        : <li>no se encontraron resultados</li>
      }
    </ul>
  )
}
