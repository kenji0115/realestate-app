import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { supabase } from '../supabaseClient'
import { PropertyCard } from '../components/PropertyCard'
import { PropertyForm } from '../components/PropertyForm'

// 物件一覧画面(ログイン後に表示)
export function PropertyList() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  // 新規登録フォームを再マウントして入力内容をリセットするためのキー
  const [newFormKey, setNewFormKey] = useState(0)

  // ログイン中のユーザーが登録した物件一覧を取得する
  const fetchProperties = async () => {
    const { data, error: fetchError } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError('物件の取得に失敗しました。')
    } else {
      setProperties(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    // 画面表示時に物件一覧を取得する(データ取得後にstateを更新するeffectの一般的な書き方)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProperties()
  }, [])

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  // 新規物件を登録する
  const handleCreate = async (values) => {
    setError('')
    const { error: insertError } = await supabase
      .from('properties')
      .insert({ ...values, user_id: user.id })

    if (insertError) {
      setError('物件の登録に失敗しました。')
      return
    }

    setNewFormKey((key) => key + 1)
    await fetchProperties()
  }

  // 物件情報を更新する
  const handleUpdate = async (id, values) => {
    setError('')
    const { error: updateError } = await supabase
      .from('properties')
      .update(values)
      .eq('id', id)

    if (updateError) {
      setError('物件の更新に失敗しました。')
      return
    }

    setEditingId(null)
    await fetchProperties()
  }

  // 物件を削除する
  const handleDelete = async (id) => {
    setError('')
    const { error: deleteError } = await supabase.from('properties').delete().eq('id', id)

    if (deleteError) {
      setError('物件の削除に失敗しました。')
      return
    }

    await fetchProperties()
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

      {error && <p className="error-message">{error}</p>}

      <section className="property-form-section">
        <h2>新規物件登録</h2>
        <PropertyForm key={newFormKey} onSubmit={handleCreate} submitLabel="登録" />
      </section>

      {loading ? (
        <p className="loading">読み込み中...</p>
      ) : (
        <div className="property-grid">
          {properties.map((property) =>
            editingId === property.id ? (
              <PropertyForm
                key={property.id}
                initialValues={property}
                submitLabel="保存"
                onSubmit={(values) => handleUpdate(property.id, values)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <PropertyCard
                key={property.id}
                property={property}
                onEdit={() => setEditingId(property.id)}
                onDelete={() => handleDelete(property.id)}
              />
            ),
          )}
        </div>
      )}
    </div>
  )
}
