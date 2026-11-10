import { MapPin, Phone, Mail } from 'lucide-react'
import SubmitForm from '@/components/SubmitForm'
import PageHeader from '@/components/PageHeader'
import { CO } from '@/lib/data'
export const metadata = { title: 'Contact and quotes', description: 'Request a quote or contact ZAYDS Engineering Consulting in Ikeja, Lagos.' }
export default function C() {
    return <main><PageHeader eyebrow="Contact" title="Let us talk about your project" intro="Call, message or send a quote request. We respond within one working day." />
        <section className="sec"><div className="wrap grid lg:grid-cols-2 gap-16">
            <div className="space-y-8"><div className="flex gap-4"><MapPin className="text-gold shrink-0 mt-1" /><div><h3 className="text-lg">Office</h3><p className="text-stone-600">{CO.addr}</p></div></div>
                <div className="flex gap-4"><Phone className="text-gold shrink-0 mt-1" /><div><h3 className="text-lg">Telephone</h3>{CO.tel.map(t => <a key={t} href={`tel:${t.replace(/ /g, '')}`} className="block text-stone-600 hover:text-gold">{t}</a>)}</div></div>
                <div className="flex gap-4"><Mail className="text-gold shrink-0 mt-1" /><div><h3 className="text-lg">Email</h3><a href={`mailto:${CO.email}`} className="text-stone-600 hover:text-gold break-all">{CO.email}</a></div></div>
                <iframe title="Office map" className="w-full h-72 border border-stone-200" loading="lazy" src="https://www.google.com/maps?q=5+Folawewo+Street+Ikeja+Lagos&output=embed" /></div>
            <div id="quote" className="border border-stone-200 p-8 md:p-10 self-start scroll-mt-28"><h2 className="text-3xl mb-6">Request a quote</h2><SubmitForm type="quote" /></div></div></section></main>
}
