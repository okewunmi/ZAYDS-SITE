'use client'
import {useState} from 'react'
import {sb} from '@/lib/supabase'
import {SERVICES} from '@/lib/data'
export default function SubmitForm({type='quote',jobs=[]}){const q=type==='quote';const [st,setSt]=useState('');const [busy,setBusy]=useState(false)
async function go(e){e.preventDefault();const form=e.target;setBusy(true);setSt('Sending…');const f=new FormData(form);const b=Object.fromEntries([...f.entries()].filter(([,v])=>typeof v==='string'));b.type=type
try{const file=f.get('file');if(file&&file.size){const p=`${q?'quotes':'cv'}/${Date.now()}-${file.name.replace(/[^\w.]/g,'_')}`;const u=await sb().storage.from('media').upload(p,file);if(u.error)throw u.error;b[q?'file_url':'cv_url']=sb().storage.from('media').getPublicUrl(p).data.publicUrl}
const r=await fetch('/api/submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(b)});if(!r.ok)throw new Error()
setSt(q?'Thank you. Our engineers will respond within one working day.':'Application received. We will be in touch.');form.reset()}catch{setSt('Could not send. Please call or WhatsApp us instead.')}setBusy(false)}
return <form onSubmit={go} className="grid gap-4 max-w-xl"><input name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden/>
<input name="name" required placeholder="Full name" className="inp"/><div className="grid sm:grid-cols-2 gap-4"><input name="email" type="email" required placeholder="Email" className="inp"/><input name="phone" placeholder="Phone" className="inp"/></div>
{q?<select name="service" required className="inp"><option value="">Select a service</option>{SERVICES.map(s=><option key={s.slug}>{s.title}</option>)}</select>
:<select name="job" required className="inp"><option value="">Position</option>{jobs.map(j=><option key={j.id}>{j.title}</option>)}<option>General application / internship</option></select>}
<textarea name={q?'details':'message'} required={q} rows={5} placeholder={q?'Describe your project':'Tell us about yourself'} className="inp"/>
<label className="text-sm">{q?'Drawings or specifications (optional)':'CV (PDF or Word)'}<input name="file" type="file" required={!q} className="block mt-1"/></label>
<button disabled={busy} className="btn btn-gold justify-self-start">{q?'Send quote request':'Submit application'}</button><p role="status" className="text-sm">{st}</p></form>}
