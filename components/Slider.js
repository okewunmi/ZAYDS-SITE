'use client'
import {useEffect,useState} from 'react'
export default function Slider({items}){const [i,setI]=useState(0)
useEffect(()=>{if(items.length<2)return;const t=setInterval(()=>setI(x=>(x+1)%items.length),4000);return()=>clearInterval(t)},[items.length])
if(!items.length)return null;const c=items[i]
return <div className="text-center" aria-live="polite"><div className="h-24 flex flex-col items-center justify-center">
{c.logo_url&&<img src={c.logo_url} alt={c.name} className="h-14 object-contain"/>}<p className="mt-2 font-display text-2xl text-forest">{c.name}</p>{c.role&&<p className="text-sm text-stone-500">{c.role}</p>}</div>
<div className="flex justify-center gap-2 mt-4">{items.map((_,n)=><button key={n} onClick={()=>setI(n)} aria-label={`Show client ${n+1}`} className={`h-2 w-8 ${n===i?'bg-gold':'bg-stone-300'}`}/>)}</div></div>}
