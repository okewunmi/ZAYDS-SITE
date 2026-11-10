import { notFound } from 'next/navigation'
import { fetchRows } from '@/lib/supabase'
export const revalidate = 60
const get = async s => (await fetchRows('posts')).find(p => p.slug === s)
export async function generateMetadata({ params }) { const p = await get(params.slug); return p ? { title: p.title, description: p.excerpt, alternates: { canonical: `/insights/${p.slug}` }, openGraph: { title: p.title, description: p.excerpt, type: 'article', images: p.image_url ? [p.image_url] : [] } } : {} }
export default async function Post({ params }) {
    const p = await get(params.slug); if (!p) notFound()
    return <main><article className="wrap max-w-3xl py-16 md:py-24"><p className="eyebrow">{new Date(p.created_at).toLocaleDateString('en-NG', { dateStyle: 'long' })}</p><h1 className="mt-4 text-4xl md:text-5xl">{p.title}</h1>{p.image_url && <img src={p.image_url} alt={p.title} className="mt-10 w-full" />}<div className="mt-10 text-lg leading-[1.9] whitespace-pre-line text-stone-700">{p.body}</div></article></main>
}
