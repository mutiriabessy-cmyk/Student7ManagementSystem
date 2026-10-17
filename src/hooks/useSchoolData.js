import { useContext } from 'react'
import SchoolDataContext from './schoolDataContext.js'

export function useSchoolData() {
  const context = useContext(SchoolDataContext)
  if (!context) throw new Error('useSchoolData must be used within SchoolDataProvider')
  return context
}
