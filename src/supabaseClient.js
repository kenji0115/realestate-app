import { createClient } from '@supabase/supabase-js'

// .envファイルに設定したSupabaseのProject URLとPublishable keyを読み込む
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
