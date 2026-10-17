import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSchoolData } from '../hooks/useSchoolData.js'

function Navbar() {
  const { user, signOut } = useSchoolData()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleSignOut() {
    signOut()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg site-nav">
      <div className="container">
        <Link className="navbar-brand brand-mark" to="/">
          <span className="brand-icon">C</span> Classroom
        </Link>
        <button className="navbar-toggler" type="button" aria-controls="mainNavigation" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen((open) => !open)}>
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`navbar-collapse${menuOpen ? ' show' : ''}`} id="mainNavigation">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            {!user && <>
              <NavLink className="nav-link" to="/">Home</NavLink>
              <NavLink className="nav-link" to="/about">About</NavLink>
              <Link className="nav-link" to="/login">Log in</Link>
              <Link className="btn btn-primary nav-cta" to="/signup">Get started</Link>
            </>}
            {user && <>
              <span className="signed-in-label">{user.role === 'admin' ? 'Administrator' : 'Teacher'} workspace</span>
              <Link className="nav-link" to={`/${user.role}`} onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <span className="user-avatar">{user.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span>
              <span className="user-name">{user.name}</span>
              <button className="btn btn-outline-secondary btn-sm ms-lg-2" onClick={handleSignOut}>Sign out</button>
            </>}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
