import SubmitForm from '@/components/SubmitForm'
import {fetchRows} from '@/lib/supabase'
export const revalidate=60
export const metadata={title:'Careers',description:'Engineering jobs and internships at ZAYDS Engineering Consulting, Lagos.'}
export default async function C(){const jobs=await fetchRows('jobs')
return <main className="max-w-6xl mx-auto px-5 py-14 grid md:grid-cols-2 gap-12"><div><h1 className="text-5xl">Careers</h1><p className="mt-3">Join a multidisciplinary team building reliable, sustainable engineering solutions.</p>
{jobs.length?jobs.map(j=><div key={j.id} className="mt-6 border-l-4 border-gold pl-4"><h2 className="text-2xl">{j.title}</h2><p className="text-sm text-stone-500">{[j.type,j.location].filter(Boolean).join(' · ')}</p><p className="mt-1 whitespace-pre-line">{j.description}</p></div>):<p className="mt-6 text-stone-500">No open roles right now. Send a general application or internship request.</p>}</div>
<div><h2 className="text-3xl mb-4">Apply</h2><SubmitForm type="application" jobs={jobs}/></div></main>}
