import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import About from './pages/About.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import Help from './pages/Help.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import ManageStudents from './pages/ManageStudents.jsx'
import ManageTeachers from './pages/ManageTeachers.jsx'
import Settings from './pages/Settings.jsx'
import Signup from './pages/Signup.jsx'
import TeacherDashboard from './pages/TeacherDashboard.jsx'
import SchoolDataProvider from './hooks/SchoolDataProvider.jsx'

function Footer() {
  return     <footer className="site-footer"><div className="container footer-inner"><span>© {new Date().getFullYear()} Classroom · Student Management System demo</span><div className="footer-links"><Link to="/about">About</Link><Link to="/login">Sign in</Link></div></div></footer>
}

function AppRoutes() {
  return (
    <SchoolDataProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<DashboardLayout role="admin" />}>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<ManageStudents role="admin" />} />
          <Route path="students/:studentId" element={<ManageStudents role="admin" />} />
          <Route path="teachers" element={<ManageTeachers />} />
          <Route path="teachers/:teacherId" element={<ManageTeachers />} />
          <Route path="settings" element={<Settings role="admin" />} />
          <Route path="help" element={<Help role="admin" />} />
        </Route>
        <Route path="/teacher" element={<DashboardLayout role="teacher" />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="students" element={<ManageStudents role="teacher" />} />
          <Route path="students/:studentId" element={<ManageStudents role="teacher" />} />
          <Route path="settings" element={<Settings role="teacher" />} />
          <Route path="help" element={<Help role="teacher" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </SchoolDataProvider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
