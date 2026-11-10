import {notFound} from 'next/navigation'
import {fetchRows} from '@/lib/supabase'
export const revalidate=60
const get=async s=>(await fetchRows('posts')).find(p=>p.slug===s)
export async function generateMetadata({params}){const p=await get(params.slug);return p?{title:p.title,description:p.excerpt,alternates:{canonical:`/insights/${p.slug}`},openGraph:{title:p.title,description:p.excerpt,type:'article',images:p.image_url?[p.image_url]:[]}}:{}}
export default async function Post({params}){const p=await get(params.slug);if(!p)notFound()
return <article className="max-w-3xl mx-auto px-5 py-14"><h1 className="text-5xl">{p.title}</h1><p className="text-sm text-stone-500 mt-2">{new Date(p.created_at).toLocaleDateString('en-NG',{dateStyle:'long'})}</p>{p.image_url&&<img src={p.image_url} alt={p.title} className="mt-6 w-full"/>}<div className="mt-6 text-lg leading-relaxed whitespace-pre-line">{p.body}</div></article>}
