import RecordManager from '../components/RecordManager.jsx'

function ManageStudents({ role }) {
  return <RecordManager type="student" role={role} />
}

export default ManageStudents
