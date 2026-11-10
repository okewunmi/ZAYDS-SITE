import SubmitForm from '@/components/SubmitForm'
import {CO} from '@/lib/data'
export const metadata={title:'Contact and quotes',description:'Request a quote or contact ZAYDS Engineering Consulting in Ikeja, Lagos.'}
export default function C(){return <main className="max-w-6xl mx-auto px-5 py-14 grid md:grid-cols-2 gap-12"><div><h1 className="text-5xl">Contact us</h1><p className="mt-4">{CO.addr}</p>{CO.tel.map(t=><p key={t}><a href={`tel:${t.replace(/ /g,'')}`}>{t}</a></p>)}<p><a href={`mailto:${CO.email}`}>{CO.email}</a></p>
<iframe title="Office map" className="mt-6 w-full h-64 border-0" loading="lazy" src="https://www.google.com/maps?q=5+Folawewo+Street+Ikeja+Lagos&output=embed"/></div>
<div id="quote"><h2 className="text-3xl mb-4">Request a quote</h2><SubmitForm type="quote"/></div></main>}
