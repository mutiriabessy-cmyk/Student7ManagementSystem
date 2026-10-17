import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSchoolData } from '../hooks/useSchoolData.js'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('admin')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const { signIn } = useSchoolData()
  const navigate = useNavigate()
  const location = useLocation()

  function submit(event) {
    event.preventDefault()
    setError('')
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) return setError('Please enter a valid email address.')
    if (password.length < 6) return setError('Your password must be at least 6 characters.')
    const destinationRole = location.state?.role || role
    signIn(email.trim(), destinationRole)
    navigate(location.state?.from || `/${destinationRole}`, { replace: true })
  }

  return <main className="auth-page"><div className="auth-card"><div className="auth-aside"><span className="auth-sparkle">C</span><span className="eyebrow">CLASSROOM WORKSPACE</span><h1>Sign in to<br />manage your<br /><span>school.</span></h1><p>Use your account to open the administrator or teacher dashboard.</p><div className="auth-aside-foot">Student and staff management</div></div>
    <div className="auth-form-area"><span className="eyebrow">YOUR WORKSPACE</span><h2>Log in to Classroom</h2><p className="auth-description">Enter your details to pick up where you left off.</p>
      {notice && <div className="alert alert-success py-2">{notice}</div>}
      {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
      <form onSubmit={submit} noValidate>
        <label className="form-label">I&apos;m signing in as<select className="form-select" value={role} onChange={(event) => setRole(event.target.value)}><option value="admin">Administrator</option><option value="teacher">Teacher</option></select></label>
        <label className="form-label">Email address<input className="form-control" type="email" autoComplete="email" placeholder="you@school.edu" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
        <label className="form-label">Password<input className="form-control" type="password" autoComplete="current-password" placeholder="At least 6 characters" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} /></label>
        <button className="btn btn-primary w-100 auth-submit">Log in to your workspace <span>→</span></button>
      </form>
      <p className="auth-switch">New to Classroom? <Link to="/signup">Create an account</Link></p>
      <button className="demo-fill" onClick={() => { setEmail('admin@school.edu'); setPassword('school123'); setRole('admin'); setNotice('Demo details filled in — click Log in to continue.') }}>Use the admin demo details</button>
    </div>
  </div></main>
}

export default Login
