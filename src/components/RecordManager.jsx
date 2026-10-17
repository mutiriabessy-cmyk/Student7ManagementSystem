import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSchoolData } from '../hooks/useSchoolData.js'

const studentFields = [
  { key: 'name', label: 'Full name', placeholder: 'e.g. Amara Okafor' },
  { key: 'email', label: 'Email address', type: 'email', placeholder: 'name@example.edu' },
  { key: 'grade', label: 'Grade', placeholder: 'e.g. Grade 10' },
  { key: 'className', label: 'Class', placeholder: 'e.g. 10A' },
]
const teacherFields = [
  { key: 'name', label: 'Full name', placeholder: 'e.g. Grace Ndlovu' },
  { key: 'email', label: 'Email address', type: 'email', placeholder: 'name@example.edu' },
  { key: 'subject', label: 'Subject', placeholder: 'e.g. Mathematics' },
  { key: 'classes', label: 'Classes', placeholder: 'e.g. 9A, 10A' },
]

function RecordManager({ type, role }) {
  const { students, setStudents, teachers, setTeachers } = useSchoolData()
  const records = type === 'student' ? students : teachers
  const setRecords = type === 'student' ? setStudents : setTeachers
  const isStudent = type === 'student'
  const fields = isStudent ? studentFields : teacherFields
  const base = `/${role}/${isStudent ? 'students' : 'teachers'}`
  const { studentId, teacherId } = useParams()
  const selectedId = studentId || teacherId
  const navigate = useNavigate()
  const selectedRecord = records.find((record) => record.id === selectedId)
  const [query, setQuery] = useState('')
  const [gradeFilter, setGradeFilter] = useState('All grades')
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({})
  const pageSize = 8

  const filteredRecords = useMemo(() => records.filter((record) => {
    const searchText = `${record.name} ${record.email} ${record.id} ${record.grade || ''} ${record.subject || ''} ${record.className || ''}`.toLowerCase()
    return searchText.includes(query.toLowerCase()) && (!isStudent || gradeFilter === 'All grades' || record.grade === gradeFilter)
  }), [records, query, gradeFilter, isStudent])
  const pageCount = Math.max(1, Math.ceil(filteredRecords.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const visibleRecords = filteredRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  function openForm(record = null) {
    setEditing(record)
    setForm(record ? Object.fromEntries(fields.map(({ key }) => [key, record[key] || ''])) : Object.fromEntries(fields.map(({ key }) => [key, ''])))
  }

  function submitForm(event) {
    event.preventDefault()
    const name = form.name.trim()
    const email = form.email.trim()
    if (!name || !email) return
    if (editing) {
      setRecords((current) => current.map((record) => record.id === editing.id ? { ...record, ...form, name, email } : record))
    } else {
      let nextNumber = Number(String(Date.now()).slice(-5))
      while (records.some((record) => record.id === `${isStudent ? 'ST' : 'TC'}-${String(nextNumber).padStart(5, '0')}`)) {
        nextNumber = (nextNumber + 1) % 100000
      }
      const newRecord = {
        ...form,
        name,
        email,
        id: `${isStudent ? 'ST' : 'TC'}-${String(nextNumber).padStart(5, '0')}`,
        status: 'Active',
        ...(isStudent ? { attendance: 100, joined: new Date().toISOString().slice(0, 10) } : {}),
      }
      setRecords((current) => [newRecord, ...current])
    }
    setEditing(null)
    setForm({})
  }

  function deleteRecord(id) {
    const record = records.find((item) => item.id === id)
    if (!record || !window.confirm(`Delete ${record.name}'s record? This action cannot be undone.`)) return
    setRecords((current) => current.filter((item) => item.id !== id))
    if (selectedId) navigate(base)
  }

  if (selectedId) {
    if (!selectedRecord) return <div className="empty-state"><span>⌕</span><h2>Record not found</h2><p>It may have been removed or the link may be incorrect.</p><Link className="btn btn-primary" to={base}>Back to {isStudent ? 'students' : 'teachers'}</Link></div>
    return <div className="record-detail">
      <Link className="back-link" to={base}>← Back to {isStudent ? 'students' : 'teachers'}</Link>
      <div className="detail-card">
        <div className="detail-top"><div className="person-avatar large">{selectedRecord.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</div><div className="detail-person"><span className="eyebrow">{isStudent ? 'STUDENT PROFILE' : 'TEACHER PROFILE'}</span><h1>{selectedRecord.name}</h1><p>{selectedRecord.id} <span className="status-pill">{selectedRecord.status}</span></p></div><div className="detail-actions"><button className="btn btn-outline-secondary" onClick={() => openForm(selectedRecord)}>Edit record</button><button className="btn btn-outline-danger" onClick={() => deleteRecord(selectedRecord.id)}>Delete</button></div></div>
        <div className="detail-grid">
          {[
            ['Email address', selectedRecord.email],
            ...(isStudent ? [['Grade', selectedRecord.grade], ['Class', selectedRecord.className], ['Attendance', `${selectedRecord.attendance}%`], ['Enrollment date', selectedRecord.joined]] : [['Subject', selectedRecord.subject], ['Classes', selectedRecord.classes]]),
          ].map(([label, value]) => <div className="detail-field" key={label}><span>{label}</span><strong>{value || '—'}</strong></div>)}
        </div>
      </div>
      {editing && <RecordModal fields={fields} form={form} setForm={setForm} editing={editing} onClose={() => setEditing(null)} onSubmit={submitForm} type={type} />}
    </div>
  }

  return <div className="manager-page">
    <div className="page-heading manager-heading">
      <div><span className="eyebrow">SCHOOL DIRECTORY</span><h1>{isStudent ? 'Students' : 'Teachers'}</h1><p>Keep your school community organized and up to date.</p></div>
      <button className="btn btn-primary" onClick={() => openForm()}><span className="button-plus">＋</span> Add {isStudent ? 'student' : 'teacher'}</button>
    </div>
    <div className="records-card">
      <div className="records-toolbar"><div className="search-box"><span>⌕</span><input aria-label={`Search ${type}s`} placeholder={`Search ${type}s by name, email or ID...`} value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} /></div>
        {isStudent && <select className="form-select grade-select" aria-label="Filter by grade" value={gradeFilter} onChange={(event) => { setGradeFilter(event.target.value); setPage(1) }}><option>All grades</option>{[...new Set(records.map((record) => record.grade))].sort().map((grade) => <option key={grade}>{grade}</option>)}</select>}
      </div>
      {visibleRecords.length ? <div className="table-responsive"><table className="table align-middle records-table"><thead><tr><th>{isStudent ? 'STUDENT' : 'TEACHER'}</th><th>{isStudent ? 'GRADE / CLASS' : 'SUBJECT'}</th><th>EMAIL</th><th>STATUS</th><th aria-label="Actions" /></tr></thead><tbody>
        {visibleRecords.map((record) => <tr key={record.id}><td><Link to={`${base}/${record.id}`} className="person-cell"><span className="person-avatar">{record.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span><span><strong>{record.name}</strong><small>{record.id}</small></span></Link></td><td><strong className="table-primary-text">{isStudent ? record.grade : record.subject}</strong><small className="table-subtext">{isStudent ? record.className : record.classes}</small></td><td className="email-cell">{record.email}</td><td><span className="status-pill">{record.status}</span></td><td><div className="row-actions"><Link className="icon-action" aria-label={`View ${record.name}`} to={`${base}/${record.id}`}>↗</Link><button className="icon-action" aria-label={`Edit ${record.name}`} onClick={() => openForm(record)}>✎</button><button className="icon-action delete-action" aria-label={`Delete ${record.name}`} onClick={() => deleteRecord(record.id)}>×</button></div></td></tr>)}
      </tbody></table></div> : <div className="empty-state"><span>⌕</span><h2>No {isStudent ? 'students' : 'teachers'} found</h2><p>Try another search or add a new record.</p></div>}
      <div className="records-footer"><span>Showing {filteredRecords.length ? (currentPage - 1) * pageSize + 1 : 0}–{Math.min(currentPage * pageSize, filteredRecords.length)} of {filteredRecords.length} {isStudent ? 'students' : 'teachers'}</span><div className="pagination-controls"><button className="page-button" disabled={currentPage <= 1} onClick={() => setPage(currentPage - 1)}>← Previous</button><span>Page {currentPage} of {pageCount}</span><button className="page-button" disabled={currentPage >= pageCount} onClick={() => setPage(currentPage + 1)}>Next →</button></div></div>
    </div>
    {editing === null && Object.keys(form).length > 0 && <RecordModal fields={fields} form={form} setForm={setForm} editing={editing} onClose={() => setForm({})} onSubmit={submitForm} type={type} />}
    {editing && <RecordModal fields={fields} form={form} setForm={setForm} editing={editing} onClose={() => setEditing(null)} onSubmit={submitForm} type={type} />}
  </div>
}

function RecordModal({ fields, form, setForm, editing, onClose, onSubmit, type }) {
  return <div className="modal-backdrop-custom" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <div className="record-modal" role="dialog" aria-modal="true" aria-labelledby="record-modal-title">
      <div className="modal-heading"><div><span className="eyebrow">SCHOOL DIRECTORY</span><h2 id="record-modal-title">{editing ? 'Edit' : 'Add'} {type}</h2></div><button className="modal-close" aria-label="Close" onClick={onClose}>×</button></div>
      <form onSubmit={onSubmit}><div className="form-grid">{fields.map((field) => <label className="form-label" key={field.key}>{field.label}<input required type={field.type || 'text'} className="form-control" placeholder={field.placeholder} value={form[field.key] || ''} onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))} /></label>)}</div>
        <div className="modal-actions"><button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cancel</button><button className="btn btn-primary">{editing ? 'Save changes' : `Add ${type}`}</button></div>
      </form>
    </div>
  </div>
}

export default RecordManager
