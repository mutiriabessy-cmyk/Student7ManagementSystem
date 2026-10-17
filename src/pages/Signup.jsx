import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSchoolData } from '../hooks/useSchoolData.js'

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', role: 'teacher', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const { signIn } = useSchoolData()
  const navigate = useNavigate()

  function submit(event) {
    event.preventDefault()
    setError('')
    if (form.name.trim().length < 2) return setError('Please enter your full name.')
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Please enter a valid email address.')
    if (form.password.length < 6) return setError('Choose a password with at least 6 characters.')
    if (form.password !== form.confirmPassword) return setError('Your passwords do not match.')
    signIn(form.email.trim(), form.role, form.name.trim())
    navigate(`/${form.role}`, { replace: true })
  }

  return <main className="auth-page signup-page"><div className="auth-card signup-card"><div className="auth-aside signup-aside"><span className="auth-sparkle">C</span><span className="eyebrow">CLASSROOM WORKSPACE</span><h1>School records,<br />organized for<br /><span>your team.</span></h1><p>Create an account to explore the student and staff management tools.</p></div>
    <div className="auth-form-area"><span className="eyebrow">JOIN YOUR COMMUNITY</span><h2>Create your account</h2><p className="auth-description">It only takes a moment to get started.</p>
      {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
      <form onSubmit={submit} noValidate>
        <label className="form-label">Full name<input className="form-control" autoComplete="name" placeholder="e.g. Alex Morgan" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required /></label>
        <label className="form-label">Email address<input className="form-control" type="email" autoComplete="email" placeholder="you@school.edu" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label>
        <label className="form-label">Your role<select className="form-select" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}><option value="teacher">Teacher</option><option value="admin">Administrator</option></select></label>
        <div className="row g-3"><div className="col-sm-6"><label className="form-label">Password<input className="form-control" type="password" autoComplete="new-password" placeholder="6+ characters" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required minLength={6} /></label></div><div className="col-sm-6"><label className="form-label">Confirm password<input className="form-control" type="password" autoComplete="new-password" placeholder="Repeat password" value={form.confirmPassword} onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })} required /></label></div></div>
        <button className="btn btn-primary w-100 auth-submit">Create your workspace <span>→</span></button>
      </form>
      <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  </div></main>
}

export default Signup
