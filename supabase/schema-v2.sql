-- Run after schema.sql
create table posts(id uuid primary key default gen_random_uuid(),title text not null,slug text unique not null,excerpt text,body text,image_url text,published boolean default false,created_at timestamptz default now());
create table jobs(id uuid primary key default gen_random_uuid(),title text not null,type text,location text,description text,active boolean default true,created_at timestamptz default now());
create table applications(id uuid primary key default gen_random_uuid(),job text,name text not null,email text,phone text,message text,cv_url text,created_at timestamptz default now());
create table testimonials(id uuid primary key default gen_random_uuid(),name text not null,role text,quote text not null,approved boolean default true,created_at timestamptz default now());
create table service_images(id uuid primary key default gen_random_uuid(),slug text unique not null,image_url text,created_at timestamptz default now());
alter table posts enable row level security;alter table jobs enable row level security;alter table applications enable row level security;alter table testimonials enable row level security;alter table service_images enable row level security;
create policy "read posts" on posts for select using(published);
create policy "read jobs" on jobs for select using(active);
create policy "read testimonials" on testimonials for select using(approved);
create policy "read service images" on service_images for select using(true);
create policy "submit application" on applications for insert to anon,authenticated with check(true);
create policy "admin reads applications" on applications for select to authenticated using(true);
create policy "admin deletes applications" on applications for delete to authenticated using(true);
create policy "admin posts" on posts for all to authenticated using(true) with check(true);
create policy "admin jobs" on jobs for all to authenticated using(true) with check(true);
create policy "admin testimonials" on testimonials for all to authenticated using(true) with check(true);
create policy "admin service images" on service_images for all to authenticated using(true) with check(true);
