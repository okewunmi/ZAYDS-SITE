import {fetchRows} from '@/lib/supabase'
export const revalidate=60
export const metadata={title:'Projects',description:'Completed electrical, solar, HVAC, automation and design projects by ZAYDS Engineering Consulting.'}
export default async function P(){const p=await fetchRows('projects')
return <main className="max-w-6xl mx-auto px-5 py-14"><h1 className="text-5xl">Projects</h1>
{p.length?<div className="mt-8 grid md:grid-cols-3 gap-6">{p.map(x=><article key={x.id}>{x.image_url&&<img src={x.image_url} alt={x.title} loading="lazy" className="aspect-[4/3] object-cover w-full"/>}<h2 className="text-2xl mt-3">{x.title}</h2><p className="text-sm text-stone-500">{x.category} {x.location&&`· ${x.location}`}</p><p className="mt-1 text-sm">{x.scope}</p></article>)}</div>:<p className="mt-6">No projects published yet.</p>}</main>}
