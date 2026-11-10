

import './globals.css'
import Script from 'next/script'
import { Newsreader, Nunito_Sans } from 'next/font/google'
import { MessageCircle } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { CO } from '@/lib/data'
import { SITE } from '@/lib/site'

const display = Newsreader({ subsets: ['latin'], variable: '--f-display' })
const body = Nunito_Sans({ subsets: ['latin'], variable: '--f-body' })

const desc =
  'Electrical, solar and renewable energy, automation, HVAC, MEP design and project management in Ikeja, Lagos, Nigeria.'

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'ZAYDS Engineering Consulting Limited | Engineering consultants in Lagos',
    template: '%s | ZAYDS Engineering',
  },
  description: desc,
  openGraph: {
    title: CO.name,
    description: desc,
    siteName: CO.name,
    type: 'website',
    locale: 'en_NG',
  },
  alternates: { canonical: '/' },
  verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: CO.name,
  url: SITE,
  email: CO.email,
  telephone: CO.tel[0],
  slogan: CO.motto,
  areaServed: 'Nigeria',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '5 Folawewo Street, Off Ogundana Drive, Off Allen Avenue',
    addressLocality: 'Ikeja',
    addressRegion: 'Lagos',
    addressCountry: 'NG',
  },
}

export default function RootLayout({ children }) {
  const ga = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <Nav />
        {children}
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {ga && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
              strategy="afterInteractive"
            />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}');`}
            </Script>
          </>
        )}

        <a
          href={`https://wa.me/${CO.wa}`}
          aria-label="Chat on WhatsApp"
          className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
        >
          <MessageCircle size={26} />
        </a>
      </body>
    </html>
  )
}