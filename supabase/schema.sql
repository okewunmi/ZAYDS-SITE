create table projects(id uuid primary key default gen_random_uuid(),title text not null,category text,location text,scope text,image_url text,featured boolean default true,created_at timestamptz default now());
create table clients(id uuid primary key default gen_random_uuid(),name text not null,quote text,role text,logo_url text,sort int default 0,created_at timestamptz default now());
create table quotes(id uuid primary key default gen_random_uuid(),name text not null,email text,phone text,service text,details text,file_url text,created_at timestamptz default now());
alter table projects enable row level security;alter table clients enable row level security;alter table quotes enable row level security;
create policy "read projects" on projects for select using(true);
create policy "read clients" on clients for select using(true);
create policy "admin projects" on projects for all to authenticated using(true) with check(true);
create policy "admin clients" on clients for all to authenticated using(true) with check(true);
create policy "anyone submits quote" on quotes for insert to anon,authenticated with check(true);
create policy "admin reads quotes" on quotes for select to authenticated using(true);
create policy "admin deletes quotes" on quotes for delete to authenticated using(true);
insert into storage.buckets(id,name,public) values('media','media',true) on conflict do nothing;
create policy "public media read" on storage.objects for select using(bucket_id='media');
create policy "anyone uploads quote files" on storage.objects for insert to anon,authenticated with check(bucket_id='media');
create policy "admin manages media" on storage.objects for all to authenticated using(bucket_id='media') with check(bucket_id='media');
-- Create your admin user in Supabase > Authentication > Users (disable public sign-ups).
