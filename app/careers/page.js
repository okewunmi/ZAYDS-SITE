import SubmitForm from '@/components/SubmitForm'
import PageHeader from '@/components/PageHeader'
import {fetchRows} from '@/lib/supabase'
export const revalidate=60
export const metadata={title:'Careers',description:'Engineering jobs and internships at ZAYDS Engineering Consulting, Lagos.'}
export default async function C(){const jobs=await fetchRows('jobs')
return <main><PageHeader eyebrow="Careers" title="Build your career with us" intro="Join a multidisciplinary team delivering reliable, sustainable engineering solutions."/>
<section className="sec"><div className="wrap grid lg:grid-cols-2 gap-16"><div><h2 className="text-3xl">Open positions</h2>
{jobs.length?<div className="mt-8 space-y-6">{jobs.map(j=><div key={j.id} className="border border-stone-200 p-7"><h3 className="text-xl">{j.title}</h3><p className="mt-1 text-sm text-gold">{[j.type,j.location].filter(Boolean).join(' · ')}</p><p className="mt-3 text-sm text-stone-600 whitespace-pre-line">{j.description}</p></div>)}</div>:<p className="mt-6 text-stone-500">No open roles right now. Send a general application or internship request.</p>}</div>
<div className="border border-stone-200 p-8 md:p-10 self-start"><h2 className="text-3xl mb-6">Apply</h2><SubmitForm type="application" jobs={jobs}/></div></div></section></main>}
