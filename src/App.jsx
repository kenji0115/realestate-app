import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { PropertyList } from './pages/PropertyList'
import { ProtectedRoute } from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/properties"
        element={
          <ProtectedRoute>
            <PropertyList />
          </ProtectedRoute>
        }
      />
      {/* それ以外のパスは物件一覧へリダイレクト(未ログインならログイン画面へ) */}
      <Route path="*" element={<Navigate to="/properties" replace />} />
    </Routes>
  )
}

export default App
