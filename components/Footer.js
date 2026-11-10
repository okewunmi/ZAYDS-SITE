import Link from 'next/link'
import {MapPin,Phone,Mail,Download} from 'lucide-react'
import {CO,SERVICES} from '@/lib/data'
const co=[['About us','/about'],['Projects','/projects'],['Insights','/insights'],['Careers','/careers'],['Contact','/contact']]
export default function Footer(){return <footer className="bg-forest text-stone-300 text-sm leading-7">
<div className="wrap py-16 md:py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr_1.4fr]">
<div><p className="font-display text-2xl text-white">ZAYDS</p><p className="text-xs tracking-[0.2em] uppercase text-tan">Engineering Consulting Limited</p><p className="mt-5 max-w-xs">Multidisciplinary engineering consulting and solutions. {CO.motto}.</p>
<a href="/ZAYDS-Company-Profile.pdf" download className="inline-flex items-center gap-2 mt-6 border border-tan/70 px-5 py-2.5 text-white hover:bg-tan hover:text-forest transition-colors"><Download size={16}/>Company profile</a></div>
<div><p className="font-semibold text-white mb-5 tracking-wide">Company</p><ul className="space-y-3">{co.map(([t,h])=><li key={h}><Link href={h} className="hover:text-white">{t}</Link></li>)}</ul></div>
<div><p className="font-semibold text-white mb-5 tracking-wide">Services</p><ul className="space-y-3">{SERVICES.slice(0,6).map(s=><li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-white">{s.title}</Link></li>)}</ul></div>
<div><p className="font-semibold text-white mb-5 tracking-wide">Contact</p><ul className="space-y-4">
<li className="flex gap-3"><MapPin size={18} className="shrink-0 mt-1.5 text-tan"/><span>{CO.addr}</span></li>
<li className="flex gap-3"><Phone size={18} className="shrink-0 mt-1.5 text-tan"/><span>{CO.tel.map(t=><a key={t} href={`tel:${t.replace(/ /g,'')}`} className="block hover:text-white">{t}</a>)}</span></li>
<li className="flex gap-3"><Mail size={18} className="shrink-0 mt-1.5 text-tan"/><a href={`mailto:${CO.email}`} className="break-all hover:text-white">{CO.email}</a></li></ul></div></div>
<div className="border-t border-white/10"><div className="wrap py-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-stone-400"><p>© {new Date().getFullYear()} {CO.name}. All rights reserved.</p><Link href="/admin" className="hover:text-white">Staff login</Link></div></div></footer>}
