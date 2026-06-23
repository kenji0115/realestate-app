import { useContext } from 'react'
import { AuthContext } from './auth-context'

// 認証状態を利用するためのカスタムフック
export function useAuth() {
  return useContext(AuthContext)
}
