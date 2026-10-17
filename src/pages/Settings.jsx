import { useState } from 'react'
import { useSchoolData } from '../hooks/useSchoolData.js'

function Settings({ role }) {
  const { user, signIn } = useSchoolData()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [emailUpdates, setEmailUpdates] = useState(true)
  const [message, setMessage] = useState('')

  function save(event) {
    event.preventDefault()
    if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email)) return
    signIn(email.trim(), role, name.trim())
    setMessage('Your account details have been saved.')
    window.setTimeout(() => setMessage(''), 3500)
  }

  return <div className="settings-page">
    <div className="page-heading"><div><span className="eyebrow">YOUR WORKSPACE</span><h1>Settings</h1><p>Manage your account details and notification preferences.</p></div></div>
    {message && <div className="alert alert-success settings-alert" role="status">{message}</div>}
    <div className="settings-layout"><nav className="settings-nav"><a className="selected" href="#account">Account details</a><a href="#preferences">Preferences</a><a href="#about-settings">About Classroom</a></nav>
      <div className="settings-sections">
        <section className="settings-card" id="account"><div className="settings-section-heading"><div><span className="eyebrow">PROFILE</span><h2>Account details</h2><p>Update the details your school team sees.</p></div><span className="person-avatar large">{user?.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span></div>
          <form onSubmit={save}><label className="form-label">Full name<input className="form-control" value={name} onChange={(event) => setName(event.target.value)} required /></label><label className="form-label">Email address<input className="form-control" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label className="form-label">Workspace role<input className="form-control read-only-field" value={role === 'admin' ? 'Administrator' : 'Teacher'} readOnly /></label><button className="btn btn-primary">Save changes</button></form>
        </section>
        <section className="settings-card" id="preferences"><div className="settings-section-heading"><div><span className="eyebrow">STAY IN THE LOOP</span><h2>Preferences</h2><p>Choose the updates you&apos;d like to receive.</p></div></div><label className="preference-row"><span><strong>Email updates</strong><small>Receive important school updates and account notices.</small></span><input className="form-check-input" type="checkbox" checked={emailUpdates} onChange={(event) => setEmailUpdates(event.target.checked)} /></label></section>
        <section className="settings-card" id="about-settings"><span className="eyebrow">MADE WITH CARE</span><h2>About Classroom</h2><p>Classroom helps school teams keep student and teacher information organized. This course project stores its sample data in your browser.</p><span className="version-tag">Classroom · School workspace</span></section>
      </div>
    </div>
  </div>
}

export default Settings
