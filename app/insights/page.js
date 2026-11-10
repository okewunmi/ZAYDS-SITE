import Link from 'next/link'
import {fetchRows} from '@/lib/supabase'
import PageHeader from '@/components/PageHeader'
export const revalidate=60
export const metadata={title:'Insights',description:'Engineering articles, technical tips and company news from ZAYDS Engineering Consulting.'}
export default async function I(){const p=await fetchRows('posts')
return <main><PageHeader eyebrow="Insights" title="Engineering insights" intro="Technical tips, articles and company updates."/>
<section className="sec"><div className="wrap">{p.length?<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{p.map(x=><Link key={x.id} href={`/insights/${x.slug}`} className="group border border-stone-200 hover:shadow-lg transition">{x.image_url?<img src={x.image_url} alt={x.title} loading="lazy" className="aspect-[16/10] object-cover w-full"/>:<div className="bg-cream aspect-[16/10]"/>}<div className="p-7"><p className="text-xs uppercase tracking-widest text-gold">{new Date(x.created_at).toLocaleDateString('en-NG',{dateStyle:'long'})}</p><h2 className="mt-3 text-xl group-hover:text-gold">{x.title}</h2><p className="mt-3 text-sm text-stone-600">{x.excerpt}</p></div></Link>)}</div>:<p className="text-stone-500">Articles will appear here once published.</p>}</div></section></main>}
