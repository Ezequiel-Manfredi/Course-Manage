import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export default function NavigationPanel({ children }) {
  const menuElement = useRef()
  const [size, setSize] = useState(window.innerWidth)
  const isMovile = size < 500

  useEffect(() => window.addEventListener('resize', () => { setSize(window.innerWidth) }), [])

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
