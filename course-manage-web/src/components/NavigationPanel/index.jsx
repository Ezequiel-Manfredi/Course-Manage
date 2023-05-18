import { useRef } from 'react'
import { Link, Outlet } from 'react-router-dom'
import './style.css'
import { useUserInfo } from '../../hooks/useUserInfo'

export default function NavigationPanel({ children }) {
  const { isMovile, user, removeLogin } = useUserInfo()
  const menuElement = useRef()

  const toggleMenu = () => {
    menuElement.current.toggleAttribute('hidden')
  }

  const handleLogout = () => {
    removeLogin()
  }

  return (
    <section className="container">
      <nav
        className={`menu ${isMovile ? 'menu-movile' : ''}`}
        onClick={isMovile ? toggleMenu : null}
        ref={menuElement} hidden={isMovile}
      >
        <div>
          <h4>{user?.fullName}</h4>
          <button className='btn-logout' onClick={handleLogout}>Salir</button>
        </div>
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
        <Outlet/>
      </main>
    </section>
  )
}
