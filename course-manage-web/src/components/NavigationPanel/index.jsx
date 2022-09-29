import { useContext, useRef } from 'react'
import { MovileContext } from '../../context/MovileContext'
import { Link } from 'react-router-dom'
import './style.css'

export default function NavigationPanel({ children }) {
  const { isMovile } = useContext(MovileContext)
  const menuElement = useRef()

  const toggleMenu = () => {
    menuElement.current.toggleAttribute('hidden')
  }

  return (
    <section className="container">
      <nav
        className={`menu ${isMovile ? 'menu-movile' : ''}`}
        onClick={isMovile ? toggleMenu : null}
        ref={menuElement} hidden={isMovile}
      >
        <h4>UserName</h4>
        <ul>
          <li><Link to="/courses">Cursos</Link></li>
          <li><Link to="/students">Estudiantes</Link></li>
          <li><Link to="/professors">Profesores</Link></li>
        </ul>
      </nav>
      <button
        className='menu-btn'
        onClick={toggleMenu}
        hidden={!isMovile}
      >
        <img src="/assets/bars-menu.svg"/>
      </button>
      <main>
        {children}
      </main>
    </section>
  )
}
