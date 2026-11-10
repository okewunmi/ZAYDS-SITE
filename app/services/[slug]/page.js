import Link from 'next/link'
import {notFound} from 'next/navigation'
import {Check} from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import {SERVICES} from '@/lib/data'
import {serviceImages} from '@/lib/supabase'
import {SI} from '@/lib/icons'
export const revalidate=60
export const generateStaticParams=()=>SERVICES.map(s=>({slug:s.slug}))
export function generateMetadata({params}){const s=SERVICES.find(x=>x.slug===params.slug);return s?{title:s.title,description:`${s.blurb} ZAYDS Engineering Consulting, Ikeja, Lagos.`,alternates:{canonical:`/services/${s.slug}`}}:{}}
export default async function S({params}){const s=SERVICES.find(x=>x.slug===params.slug);if(!s)notFound();const img=(await serviceImages())[s.slug]
return <main><PageHeader eyebrow="Services" title={s.title} intro={s.blurb}/>
<section className="sec"><div className="wrap grid lg:grid-cols-[260px_1fr] gap-14">
<aside><p className="eyebrow mb-4">All services</p><ul className="border-l border-stone-200 text-sm">{SERVICES.map(x=>{const I=SI[x.slug];return <li key={x.slug}><Link href={`/services/${x.slug}`} className={`flex items-center gap-3 py-3 pl-5 -ml-px border-l-2 ${x.slug===s.slug?'border-gold text-gold font-semibold':'border-transparent hover:text-gold'}`}><I size={16}/>{x.title}</Link></li>})}</ul></aside>
<div>{img&&<img src={img} alt={s.title} className="w-full max-h-[26rem] object-cover mb-12"/>}
<h2 className="text-3xl">What we offer</h2><ul className="mt-8 grid sm:grid-cols-2 gap-4">{s.items.map(i=><li key={i} className="flex gap-3 border border-stone-200 p-5"><Check size={20} className="text-gold shrink-0 mt-0.5"/>{i}</li>)}</ul>
<div className="mt-14 bg-cream p-10 flex flex-wrap items-center justify-between gap-6"><div><h3 className="text-2xl">Need this service?</h3><p className="text-stone-600">Tell us about your project and we will send a quotation.</p></div><Link href="/contact#quote" className="btn btn-gold">Request a quote</Link></div></div></div></section></main>}
