alter table public.menu_items
  add column if not exists section_title text not null default '',
  add column if not exists art_key text not null default 'coffee';
