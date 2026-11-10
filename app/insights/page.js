import Link from 'next/link'
import {fetchRows} from '@/lib/supabase'
export const revalidate=60
export const metadata={title:'Insights',description:'Engineering articles, technical tips and company news from ZAYDS Engineering Consulting.'}
export default async function I(){const p=await fetchRows('posts')
return <main className="max-w-4xl mx-auto px-5 py-14"><h1 className="text-5xl">Insights</h1>
{p.length?<div className="mt-8 space-y-8">{p.map(x=><Link key={x.id} href={`/insights/${x.slug}`} className="grid sm:grid-cols-[200px_1fr] gap-5 group">{x.image_url?<img src={x.image_url} alt={x.title} loading="lazy" className="aspect-[4/3] object-cover w-full"/>:<div className="bg-cream aspect-[4/3]"/>}<div><h2 className="text-3xl group-hover:text-gold">{x.title}</h2><p className="text-sm text-stone-500">{new Date(x.created_at).toLocaleDateString('en-NG',{dateStyle:'long'})}</p><p className="mt-2">{x.excerpt}</p></div></Link>)}</div>:<p className="mt-6">Articles will appear here once published.</p>}</main>}
