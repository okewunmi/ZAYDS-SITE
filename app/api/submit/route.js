import {NextResponse} from 'next/server'
import {createClient} from '@supabase/supabase-js'
const T={quote:{table:'quotes',f:['name','email','phone','service','details','file_url'],s:'New quote request'},application:{table:'applications',f:['job','name','email','phone','message','cv_url'],s:'New job application'}}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))
export async function POST(req){const b=await req.json().catch(()=>({}));const t=T[b.type]
if(!t||b.website||!b.name)return NextResponse.json({ok:false},{status:400})
const row={};t.f.forEach(k=>row[k]=String(b[k]||'').slice(0,5000)||null)
const {error}=await createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).from(t.table).insert(row)
if(error)return NextResponse.json({ok:false},{status:500})
if(process.env.RESEND_API_KEY){const html=Object.entries(row).filter(([,v])=>v).map(([k,v])=>`<p><b>${k}:</b> ${esc(v)}</p>`).join('')
await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.NOTIFY_FROM||'ZAYDS Website <onboarding@resend.dev>',to:[process.env.NOTIFY_TO||'zaydsengineeringconsult@gmail.com'],reply_to:row.email||undefined,subject:`${t.s}: ${row.name}`,html})}).catch(()=>{})}
return NextResponse.json({ok:true})}
