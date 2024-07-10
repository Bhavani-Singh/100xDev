import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import UserSelection from './pages/UserSelection'
import AdminSignin from './pages/admin/AdminSignin'
import UserSignin from './pages/user/UserSignin'
import UserSignup from './pages/user/UserSignup'
import { AuthProvider } from './hooks/useAuth'
import ProtectedRoute from './components/ProtectedRoute'
import Card from './pages/admin/Card'
import AdminHomePage from './pages/admin/AdminHomePage'
import Form from './pages/admin/Form'
import UserHomePage from './pages/user/UserHomePage'
import UserForm from './pages/user/UserForm'
import UserSearch from './pages/user/UserSearch'
import UserCard from './pages/user/UserCard'


function App() {

  return (
    <div>
      <NavBar style={{backgroundColor: "blue", color: "white"}} />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<UserSelection />} />
          <Route path="/admin/signin" element={<AdminSignin />} />
          <Route path="/home" element={
            <ProtectedRoute>
              <AdminHomePage />
            </ProtectedRoute>
          }/>
          <Route path="/card" element={
            <ProtectedRoute>
              <Card />
            </ProtectedRoute>
          }/>
          <Route path="/form" element={
            <ProtectedRoute>
              <Form />
            </ProtectedRoute>
          }/>
          <Route path="/user/signin" element={<UserSignin />} />
          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/user/home" element={
            <ProtectedRoute>
              <UserHomePage />
            </ProtectedRoute>} />

            <Route path="/user/form" element={
            <ProtectedRoute>
              <UserForm />
            </ProtectedRoute>} />

            <Route path="/user/search" element={
            <ProtectedRoute>
              <UserSearch />
            </ProtectedRoute>} />

            <Route path="/user/card" element={
            <ProtectedRoute>
              <UserCard />
            </ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
