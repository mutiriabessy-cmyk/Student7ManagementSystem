import { Link } from 'react-router-dom'
import { useSchoolData } from '../hooks/useSchoolData.js'

function DashboardHome({ role }) {
  const { students, teachers, user } = useSchoolData()
  const isAdmin = role === 'admin'
  const recentStudents = [...students].sort((a, b) => b.joined.localeCompare(a.joined)).slice(0, 4)
  const averageAttendance = students.length ? Math.round(students.reduce((total, student) => total + Number(student.attendance || 0), 0) / students.length) : 0

  return <div className="overview-page">
    <div className="page-heading">
      <div>
        <span className="eyebrow">{isAdmin ? 'ADMINISTRATOR DASHBOARD' : 'TEACHER DASHBOARD'}</span><h1>Good morning, {user?.name.split(' ')[0] || 'there'}</h1><p>Here is the latest information for your school.</p></div><span className="today-date">{new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())}</span></div>
    <div className="stat-grid">
      <article className="stat-card"><div className="stat-icon lavender">ST</div><span className="stat-label">Total students</span><strong>{students.length.toLocaleString()}</strong><small>Current student records</small></article>
      {isAdmin ? <article className="stat-card"><div className="stat-icon peach">TC</div><span className="stat-label">Teaching team</span><strong>{teachers.length.toLocaleString()}</strong><small>Current teacher records</small></article> : <article className="stat-card"><div className="stat-icon peach">AT</div><span className="stat-label">Average attendance</span><strong>{averageAttendance}%</strong><small>Average across student records</small></article>}
      <article className="stat-card"><div className="stat-icon mint">NEW</div><span className="stat-label">Recently enrolled</span><strong>{recentStudents.length}</strong><small>Latest student records</small></article>
    </div>
    <div className="overview-columns">
      <section className="panel recent-panel"><div className="panel-heading"><div><span className="eyebrow">STUDENT DIRECTORY</span><h2>Recently enrolled</h2></div><Link to={`/${role}/students`} className="text-link">View all <span>→</span></Link></div>
        {recentStudents.length ? <div className="recent-list">{recentStudents.map((student) => <Link to={`/${role}/students/${student.id}`} className="recent-row" key={student.id}><span className="person-avatar">{student.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span><span className="recent-student-name"><strong>{student.name}</strong><small>{student.id}</small></span><span className="recent-grade">{student.grade}<small>{student.className}</small></span><span className="recent-date">{student.joined}</span><span className="recent-arrow">↗</span></Link>)}</div> : <div className="empty-state"><h2>No student records yet</h2><p>Add your first student to see them here.</p></div>}
      </section>
      <aside className="panel quick-panel"><span className="eyebrow">QUICK LINKS</span><h2>What would you like to do?</h2><Link className="quick-link" to={`/${role}/students`}><span className="quick-icon lavender">♧</span><span><strong>Manage students</strong><small>View and update student records</small></span><span>→</span></Link>
        {isAdmin && <Link className="quick-link" to="/admin/teachers"><span className="quick-icon peach">♙</span><span><strong>Meet the teachers</strong><small>Keep your staff directory current</small></span><span>→</span></Link>}
        <Link className="quick-link" to={`/${role}/settings`}><span className="quick-icon mint">⚙</span><span><strong>Your settings</strong><small>Update your account preferences</small></span><span>→</span></Link>
        <div className="tip-box"><span>REMINDER</span><p>Student and teacher records are saved in this browser for this demo.</p></div>
      </aside>
    </div>
    <div className="dashboard-footer-note">School directory data is for demonstration purposes.</div>
  </div>
}

export default DashboardHome
