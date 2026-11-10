import { Award, Lightbulb, ShieldCheck, Briefcase, Gauge, Leaf, Download } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import Head from '@/components/Head'
export const metadata = { title: 'About us', description: 'ZAYDS Engineering Consulting Limited: vision, mission and values of a multidisciplinary engineering company in Lagos.' }
const V = [[Award, 'Excellence', 'High standards in every project.'], [Lightbulb, 'Innovation', 'Modern technology and creative approaches.'], [ShieldCheck, 'Integrity', 'Honesty, transparency and accountability.'], [Briefcase, 'Professionalism', 'Technical competence and responsibility.'], [Gauge, 'Reliability', 'Dependable solutions clients can count on.'], [Leaf, 'Sustainability', 'Energy efficiency and responsible engineering.']]
export default function A() {
    return <main><PageHeader eyebrow="About us" title="A multidisciplinary engineering company" intro="ZAYDS Engineering Consulting Limited delivers innovative, reliable and sustainable engineering and technical consulting." />
        <section className="sec"><div className="wrap grid md:grid-cols-2 gap-8"><div className="border border-stone-200 p-10"><p className="eyebrow">Our vision</p><p className="mt-4 text-lg">To become a leading engineering consulting and solutions company recognised for innovation, technical excellence, reliability and sustainable engineering practices.</p></div>
            <div className="border border-stone-200 p-10"><p className="eyebrow">Our mission</p><p className="mt-4 text-lg">To provide innovative, cost-effective and sustainable engineering solutions through technical expertise, quality service delivery and a commitment to excellence.</p></div></div></section>
        <section className="sec bg-cream pt-20"><div className="wrap"><Head center eyebrow="What guides us" title="Our core values" /><div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{V.map(([I, t, d]) => <div key={t} className="bg-white border border-stone-200 p-8"><I className="text-gold" size={28} /><h3 className="mt-5 text-xl">{t}</h3><p className="mt-2 text-sm text-stone-600">{d}</p></div>)}</div>
            <div className="mt-14 text-center"><a href="/ZAYDS-Company-Profile.pdf" download className="btn btn-gold"><Download size={16} />Download company profile</a></div></div></section></main>
}
