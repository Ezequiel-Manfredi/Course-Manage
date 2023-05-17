import { useSchool } from '../../hooks/useSchool'
import { SchoolsList } from './SchoolList'
import './style.css'

export function SchoolForm() {
  const {
    schoolSearch,
    setSchoolSearch,
    schools,
    handleSeach
  } = useSchool()

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSeach(e.target.firstElementChild.value)
  }
  const handleChange = ({ target: { value } }) => {
    setSchoolSearch(value)
    handleSeach(value)
  }

  return (
    <form className='school-form' onSubmit={handleSubmit}>
      <input
        type="search"
        onChange={handleChange}
        value={schoolSearch}
        placeholder='Selecciona tu escuela'
      />
      <button>Buscar</button>
      <SchoolsList results={schools}/>
    </form>
  )
}
