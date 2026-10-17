import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSchoolData } from '../hooks/useSchoolData.js'

function DashboardLayout({ role }) {
  const { user } = useSchoolData()
  const location = useLocation()
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname, role }} />
  if (user.role !== role) return <Navigate to={`/${user.role}`} replace />

  const base = `/${role}`
  const links = [
    { to: base, label: 'Overview', icon: '▦', end: true },
    { to: `${base}/students`, label: 'Students', icon: '♧' },
    ...(role === 'admin' ? [{ to: `${base}/teachers`, label: 'Teachers', icon: '♙' }] : []),
    { to: `${base}/settings`, label: 'Settings', icon: '⚙' },
    { to: `${base}/help`, label: 'Help center', icon: '?' },
  ]

  return (
    <main className="dashboard-shell">
      <div className="container dashboard-container">
        <aside className="dashboard-sidebar">
          <div className="sidebar-heading">WORKSPACE</div>
          <nav className="sidebar-nav" aria-label="Dashboard navigation">
            {links.map((link) => <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
              <span className="sidebar-icon">{link.icon}</span>{link.label}
            </NavLink>)}
          </nav>
          <div className="sidebar-note">
            <strong>School records</strong>
            <p>Sample information stored locally in this browser.</p>
          </div>
        </aside>
        <section className="dashboard-content"><Outlet /></section>
      </div>
    </main>
  )
}

export default DashboardLayout
