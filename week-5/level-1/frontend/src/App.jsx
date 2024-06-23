import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import UserSelection from './pages/UserSelection'
import AdminSignin from './pages/admin/AdminSignin'
import UserSignin from './pages/user/UserSignin'
import UserSignup from './pages/user/UserSignup'
import { AuthProvider } from './hooks/useAuth'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './pages/Layout'

function App() {

  return (
    <div>
      <NavBar style={{backgroundColor: "blue", color: "white"}} />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<UserSelection />} />
          <Route path="/admin/signin" element={<AdminSignin />} />
          <Route path="/user/signin" element={<UserSignin />} />
          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/home" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }/>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
