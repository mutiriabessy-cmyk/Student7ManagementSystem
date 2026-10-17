import { useEffect, useMemo, useState } from 'react'
import SchoolDataContext from './schoolDataContext.js'
import { demoUser, initialStudents, initialTeachers } from '../data/demoData.js'

function readStored(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

function SchoolDataProvider({ children }) {
  const [students, setStudents] = useState(() => readStored('sms-students', initialStudents))
  const [teachers, setTeachers] = useState(() => readStored('sms-teachers', initialTeachers))
  const [user, setUser] = useState(() => readStored('sms-user', null))

  useEffect(() => localStorage.setItem('sms-students', JSON.stringify(students)), [students])
  useEffect(() => localStorage.setItem('sms-teachers', JSON.stringify(teachers)), [teachers])
  useEffect(() => {
    if (user) localStorage.setItem('sms-user', JSON.stringify(user))
    else localStorage.removeItem('sms-user')
  }, [user])

  const value = useMemo(() => ({
    students,
    setStudents,
    teachers,
    setTeachers,
    user,
    signIn: (email, role, name) => setUser({
      name: name || (email === demoUser.email ? demoUser.name : email.split('@')[0]),
      email,
      role,
    }),
    signOut: () => setUser(null),
  }), [students, teachers, user])

  return <SchoolDataContext.Provider value={value}>{children}</SchoolDataContext.Provider>
}

export default SchoolDataProvider
