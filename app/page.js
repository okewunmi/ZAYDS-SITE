import Link from 'next/link'
import { ArrowRight, Check, Cog, Lightbulb, Puzzle, Sun } from 'lucide-react'
import Slider from '@/components/Slider'
import Head from '@/components/Head'
import { fetchRows, serviceImages } from '@/lib/supabase'
import { SERVICES, INDUSTRIES, WHY } from '@/lib/data'
import { SI, II } from '@/lib/icons'
export const revalidate = 60
export default async function Home() {
    const [projects, clients, tests, imgs] = await Promise.all([fetchRows('projects'), fetchRows('clients', 'sort', true), fetchRows('testimonials'), serviceImages()])
    const ren = SERVICES[0]
    return <main>
        <section className="relative bg-forest overflow-hidden"><svg className="trace absolute right-0 top-0 h-full w-[75%] opacity-25" viewBox="0 0 700 500" fill="none" stroke="#A68B5B" strokeWidth="2" preserveAspectRatio="xMaxYMid slice" aria-hidden><path d="M0 400H260L330 320H520L580 240H700" /><path d="M80 80H300L360 150H600" /><path d="M200 500V380L280 300V200H460" /></svg>
            <div className="wrap relative py-24 md:py-36"><p className="eyebrow !text-tan">Engineered for Excellence</p><h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl !text-white max-w-3xl">Engineering innovation. Excellence in execution.</h1>
                <p className="mt-7 max-w-xl text-lg text-white/80">Providing innovative solutions for all your engineering needs: electrical, renewable energy, automation, building services and project management.</p>
                <div className="mt-10 flex flex-wrap gap-4"><Link href="/contact#quote" className="btn btn-gold">Request a quote</Link><Link href="#services" className="btn btn-line">Explore services</Link></div></div></section>

        <section className="sec"><div className="wrap grid lg:grid-cols-2 gap-14 items-start">
            <Head eyebrow="About ZAYDS" title="Engineering solutions built on excellence" />
            <div><p className="text-lg text-stone-600">ZAYDS Engineering Consulting Limited is a multidisciplinary engineering company. From engineering design and electrical installations to renewable energy, automation, refrigeration and project management, we combine expertise and innovation to deliver results that matter.</p>
                <Link href="/about" className="mt-6 inline-flex items-center gap-2 font-semibold text-gold">Learn more about us <ArrowRight size={16} /></Link></div></div>
            <div className="wrap mt-14 grid sm:grid-cols-3 gap-6">{[[Cog, 'Engineering', 'Sound technical foundations on every project.'], [Lightbulb, 'Innovation', 'Modern, practical and efficient approaches.'], [Puzzle, 'Solutions', 'Complete results from design to commissioning.']].map(([I, t, d]) => <div key={t} className="border-t-2 border-gold pt-6"><I className="text-gold" size={28} /><h3 className="mt-4 text-xl">{t}</h3><p className="mt-2 text-stone-600 text-sm">{d}</p></div>)}</div></section>

        <section id="services" className="sec bg-cream scroll-mt-24"><div className="wrap"><Head center eyebrow="Our services" title="What we engineer" intro="One team across electrical, mechanical, energy and building services." />
            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{SERVICES.map(s => {
                const I = SI[s.slug]; return <Link key={s.slug} href={`/services/${s.slug}`} className="group flex flex-col bg-white border border-stone-200 hover:border-tan hover:shadow-lg transition">
                    {imgs[s.slug] && <img src={imgs[s.slug]} alt={s.title} loading="lazy" className="aspect-[16/9] object-cover w-full" />}
                    <div className="p-8 flex flex-col flex-1"><span className="h-12 w-12 grid place-items-center rounded-full bg-cream text-gold"><I size={22} /></span><h3 className="mt-6 text-xl">{s.title}</h3><p className="mt-3 text-sm text-stone-600">{s.blurb}</p>
                        <span className="mt-auto pt-6 inline-flex items-center gap-1 text-sm font-semibold text-gold">Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span></div></Link>
            })}</div></div></section>

        <section className="sec bg-forest"><div className="wrap grid lg:grid-cols-2 gap-14 items-center"><div><Sun className="text-tan" size={36} /><div className="mt-6"><Head light eyebrow="Featured service" title="Renewable energy and solar power" intro="Reliable, efficient power for homes, businesses and farms across Nigeria." /></div><Link href="/services/renewable-energy" className="btn btn-gold mt-9">View renewable energy</Link></div>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-5 text-white/90">{ren.items.map(i => <li key={i} className="flex gap-3"><Check size={20} className="text-tan shrink-0 mt-1" />{i}</li>)}</ul></div></section>

        <section className="sec"><div className="wrap grid lg:grid-cols-[1fr_1.6fr] gap-14"><Head eyebrow="Why ZAYDS" title="Why partner with us" />
            <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-8">{WHY.map(w => <li key={w} className="flex gap-4"><span className="h-9 w-9 shrink-0 grid place-items-center rounded-full bg-cream text-gold"><Check size={18} /></span><span className="pt-1">{w}</span></li>)}</ul></div></section>

        <section className="sec bg-cream"><div className="wrap"><div className="flex flex-wrap items-end justify-between gap-4"><Head eyebrow="Our work" title="Featured projects" /><Link href="/projects" className="inline-flex items-center gap-2 font-semibold text-gold">All projects <ArrowRight size={16} /></Link></div>
            {projects.length ? <div className="mt-12 grid md:grid-cols-3 gap-8">{projects.filter(p => p.featured).slice(0, 3).map(p => <article key={p.id} className="bg-white border border-stone-200">{p.image_url && <img src={p.image_url} alt={p.title} loading="lazy" className="aspect-[4/3] object-cover w-full" />}<div className="p-6"><h3 className="text-xl">{p.title}</h3><p className="mt-1 text-sm text-stone-500">{[p.category, p.location].filter(Boolean).join(' · ')}</p></div></article>)}</div> : <p className="mt-10 text-stone-500">Projects added in the admin dashboard appear here.</p>}</div></section>

        {clients.length > 0 && <section className="sec"><div className="wrap"><Head center eyebrow="Clients" title="Trusted by our clients" /><div className="mt-10"><Slider items={clients} /></div></div></section>}
        {tests.length > 0 && <section className="sec bg-cream"><div className="wrap"><Head center eyebrow="Testimonials" title="What clients say" /><div className="mt-12 grid md:grid-cols-3 gap-8">{tests.slice(0, 3).map(t => <blockquote key={t.id} className="bg-white border-t-2 border-gold p-8"><p className="text-stone-700">“{t.quote}”</p><footer className="mt-5 text-sm font-semibold">{t.name}{t.role && <span className="block font-normal text-stone-500">{t.role}</span>}</footer></blockquote>)}</div></div></section>}

        <section className="sec"><div className="wrap"><Head center eyebrow="Sectors" title="Industries we serve" />
            <div className="mt-12 grid grid-cols-2 lg:grid-cols-3 gap-6">{INDUSTRIES.map((n, i) => { const I = II[i]; return <div key={n} className="border border-stone-200 p-7 flex items-center gap-4"><I size={26} className="text-gold shrink-0" /><span className="font-medium">{n}</span></div> })}</div></div></section>

        <section className="bg-forest"><div className="wrap py-20 text-center"><h2 className="text-3xl md:text-4xl !text-white max-w-2xl mx-auto">Have an engineering project in mind?</h2><p className="mt-5 text-white/75 max-w-xl mx-auto">Tell us what you need and our engineers will respond within one working day.</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4"><Link href="/contact#quote" className="btn btn-gold">Request a consultation</Link><Link href="/contact" className="btn btn-line">Talk to our engineers</Link></div></div></section></main>
}
