import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { PropertyCard } from '../components/PropertyCard'
import { properties } from '../data/properties'

// 物件一覧画面(ログイン後に表示)
export function PropertyList() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="property-list-page">
      <header className="property-list-header">
        <div>
          <h1>物件一覧</h1>
          <p className="user-email">{user?.email}でログイン中</p>
        </div>
        <button type="button" onClick={handleLogout}>
          ログアウト
        </button>
      </header>

      <div className="property-grid">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  )
}
