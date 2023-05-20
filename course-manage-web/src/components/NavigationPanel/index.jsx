import { useRef } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useUserInfo } from '../../hooks/useUserInfo'
import './style.css'

export default function NavigationPanel() {
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
          <h2>{user?.fullName}</h2>
          <button onClick={handleLogout}>Salir</button>
        </div>
        <ul>
          <li><Link to="/courses">Cursos</Link></li>
          <li><Link to="/students">Estudiantes</Link></li>
          <li><Link to="/professors">Profesores</Link></li>
        </ul>
      </nav>
      <button
        onClick={toggleMenu}
        hidden={!isMovile}
      >
        <img src="/assets/bars-menu.svg"/>
      </button>
      <main className={`${isMovile ? 'main-movile' : ''}`}>
        <Outlet/>
      </main>
    </section>
  )
}
