import Link from 'next/link'
const L=[['Home','/'],['About','/about'],['Services','/services/renewable-energy'],['Projects','/projects'],['Insights','/insights'],['Careers','/careers'],['Contact','/contact']]
export default function Nav(){return <header className="sticky top-0 z-40 bg-white border-b border-stone-200"><nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
<Link href="/" className="flex items-center gap-2"><img src="/logo.jpeg" alt="ZAYDS Engineering Consulting Limited" className="h-11 w-11 object-contain"/><span className="font-display text-xl font-bold text-forest">ZAYDS</span></Link>
<div className="flex items-center gap-5 text-sm font-medium">{L.map(([t,h])=><Link key={h} href={h} className="hidden lg:inline hover:text-gold">{t}</Link>)}<Link href="/contact#quote" className="btn btn-gold !py-2">Request a quote</Link>
<details className="lg:hidden relative"><summary className="cursor-pointer list-none px-2 py-1 border">Menu</summary><div className="absolute right-0 mt-2 w-44 bg-white border shadow p-2">{L.map(([t,h])=><Link key={h} href={h} className="block py-1.5 px-2">{t}</Link>)}</div></details></div></nav></header>}
