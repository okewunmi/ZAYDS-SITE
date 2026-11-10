import {createClient} from '@supabase/supabase-js'
export const sb=()=>createClient(process.env.NEXT_PUBLIC_SUPABASE_URL||'http://localhost',process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY||'x')
export async function fetchRows(t,order='created_at',asc=false){try{const {data}=await sb().from(t).select('*').order(order,{ascending:asc});return data||[]}catch{return[]}}
export async function serviceImages(){const r=await fetchRows('service_images');return Object.fromEntries(r.map(x=>[x.slug,x.image_url]))}
