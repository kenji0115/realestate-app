-- 不動産管理アプリ用の物件テーブル
-- SupabaseのSQL Editorで実行してください。

-- 物件情報を管理するテーブル
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  rent integer not null,
  area text not null,
  layout text not null,
  created_at timestamptz not null default now()
);

-- ログイン済みユーザー(authenticated)にテーブルへのアクセス権限を付与する
-- (実際に参照・更新できる行はRLSポリシーで絞り込まれる)
grant select, insert, update, delete on public.properties to authenticated;

-- RLS(Row Level Security)を有効化する
alter table public.properties enable row level security;

-- 自分が登録した物件のみ一覧・詳細を参照できる
drop policy if exists "Allow select own properties" on public.properties;
create policy "Allow select own properties"
  on public.properties
  for select
  using (auth.uid() = user_id);

-- 登録時はログイン中の自分のuser_idでのみ登録できる
drop policy if exists "Allow insert own properties" on public.properties;
create policy "Allow insert own properties"
  on public.properties
  for insert
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ更新できる
drop policy if exists "Allow update own properties" on public.properties;
create policy "Allow update own properties"
  on public.properties
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ削除できる
drop policy if exists "Allow delete own properties" on public.properties;
create policy "Allow delete own properties"
  on public.properties
  for delete
  using (auth.uid() = user_id);
