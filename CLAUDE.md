# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

`realestate-app` はSupabase認証機能付きの不動産管理Webアプリです。
メールアドレス＋パスワードでの会員登録・ログインを行い、ログイン後に物件一覧(ダミーデータ)を表示します。

## Git運用ルール

- コードに変更を加えた場合は、その都度コミットを作成し、GitHubのリモートリポジトリへプッシュすること。
- コミットメッセージは変更内容が分かるように簡潔に記述する。
- リモートリポジトリが未設定の場合は、ユーザーに確認の上で設定する。

## 技術スタック

- React 19 + Vite(JavaScript / JSX、TypeScriptは未使用)
- 認証・データ連携: Supabase(`@supabase/supabase-js`)
- ルーティング: React Router(`react-router-dom`)
- スタイリングはプレーンCSS(`App.css` / `index.css`)
- Lint: ESLint(`npm run lint`)

## 環境変数

- SupabaseのProject URL / Publishable keyは`.env`で管理し、Gitにはコミットしない(`.gitignore`で除外済み)
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`
- キーの値の例は`.env.example`を参照(実際の値は記載しない)

## ディレクトリ構成

- `src/supabaseClient.js`: Supabaseクライアントの初期化
- `src/context/`: 認証状態を管理するコンテキスト(`AuthContext.jsx`, `auth-context.js`, `useAuth.js`)
- `src/components/`: `ProtectedRoute`(未ログイン時は`/login`へリダイレクト)、`PropertyCard`など
- `src/pages/`: `Login.jsx`, `Signup.jsx`, `PropertyList.jsx`
- `src/data/properties.js`: 物件一覧のダミーデータ

## コーディング規約

- コメントは日本語で記載する
