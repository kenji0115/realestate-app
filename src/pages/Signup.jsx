import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

// 会員登録画面
export function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    const { data, error: signUpError } = await signUp(email, password)

    setLoading(false)

    if (signUpError) {
      setError('会員登録に失敗しました。入力内容を確認してください。')
      return
    }

    // メール確認が不要な設定の場合はそのままログイン状態になるため一覧画面へ遷移する
    if (data.session) {
      navigate('/properties')
      return
    }

    // メール確認が必要な設定の場合は確認メールを案内する
    setMessage('確認メールを送信しました。メール内のリンクから本登録を完了してください。')
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>会員登録</h1>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <label htmlFor="email">メールアドレス</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">パスワード</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={6}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? '登録中...' : '会員登録'}
        </button>

        <p className="auth-switch">
          すでにアカウントをお持ちの方は<Link to="/login">ログイン</Link>
        </p>
      </form>
    </div>
  )
}
