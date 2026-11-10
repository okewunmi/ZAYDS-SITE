import Link from 'next/link'
import {CO,SERVICES} from '@/lib/data'
export default function Footer(){return <footer className="bg-forest text-stone-300 mt-20"><div className="max-w-6xl mx-auto px-5 py-12 grid md:grid-cols-3 gap-8 text-sm">
<div><p className="font-display text-2xl text-white">{CO.name}</p><p className="mt-1 text-tan">{CO.motto}</p><p className="mt-3">Multidisciplinary engineering consulting and solutions.</p><a href="/ZAYDS-Company-Profile.pdf" download className="inline-block mt-4 border border-tan px-4 py-2 text-white hover:bg-tan">Download company profile (PDF)</a></div>
<div><p className="font-semibold text-white mb-2">Services</p>{SERVICES.slice(0,6).map(s=><Link key={s.slug} href={`/services/${s.slug}`} className="block py-0.5 hover:text-white">{s.title}</Link>)}<Link href="/insights" className="block py-0.5 hover:text-white mt-2">Insights</Link><Link href="/careers" className="block py-0.5 hover:text-white">Careers</Link></div>
<div><p className="font-semibold text-white mb-2">Contact</p><p>{CO.addr}</p>{CO.tel.map(t=><p key={t}><a href={`tel:${t.replace(/ /g,'')}`}>{t}</a></p>)}<p><a href={`mailto:${CO.email}`}>{CO.email}</a></p><Link href="/admin" className="block mt-3 text-white/40">Staff login</Link></div></div>
<p className="text-center text-xs py-4 border-t border-white/10">© {new Date().getFullYear()} {CO.name}. All rights reserved.</p></footer>}
