import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // 初回のセッション確認が完了するまでのローディング状態
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 起動時に現在のログイン状態を取得する
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // ログイン・ログアウトなど認証状態の変化を監視する
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  // メールアドレスとパスワードで会員登録する
  const signUp = (email, password) => {
    return supabase.auth.signUp({ email, password })
  }

  // メールアドレスとパスワードでログインする
  const signIn = (email, password) => {
    return supabase.auth.signInWithPassword({ email, password })
  }

  // ログアウトする
  const signOut = () => {
    return supabase.auth.signOut()
  }

  const value = { user, loading, signUp, signIn, signOut }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
