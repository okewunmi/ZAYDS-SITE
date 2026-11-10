import Link from 'next/link'
import {notFound} from 'next/navigation'
import {SERVICES} from '@/lib/data'
import {serviceImages} from '@/lib/supabase'
export const revalidate=60
export const generateStaticParams=()=>SERVICES.map(s=>({slug:s.slug}))
export function generateMetadata({params}){const s=SERVICES.find(x=>x.slug===params.slug);return s?{title:s.title,description:`${s.blurb} ZAYDS Engineering Consulting, Ikeja, Lagos.`,alternates:{canonical:`/services/${s.slug}`}}:{}}
export default async function S({params}){const s=SERVICES.find(x=>x.slug===params.slug);if(!s)notFound();const img=(await serviceImages())[s.slug]
return <main className="max-w-6xl mx-auto px-5 py-14 grid md:grid-cols-[220px_1fr] gap-10"><aside className="text-sm">{SERVICES.map(x=><Link key={x.slug} href={`/services/${x.slug}`} className={`block py-1.5 ${x.slug===s.slug?'font-bold text-gold':''}`}>{x.title}</Link>)}</aside>
<div><h1 className="text-5xl">{s.title}</h1>{img&&<img src={img} alt={s.title} className="mt-6 w-full max-h-96 object-cover"/>}<p className="mt-4 text-lg max-w-xl">{s.blurb}</p><ul className="mt-6 grid sm:grid-cols-2 gap-3">{s.items.map(i=><li key={i} className="border-l-4 border-tan pl-3">{i}</li>)}</ul><Link href="/contact#quote" className="btn btn-gold mt-8">Request a quote</Link></div></main>}
