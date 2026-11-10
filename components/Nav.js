"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
const L = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services/renewable-energy"],
  ["Projects", "/projects"],
  ["Insights", "/insights"],
  ["Careers", "/careers"],
  ["Contact", "/contact"],
];
export default function Nav() {
  const [o, setO] = useState(false);
  const p = usePathname();
  useEffect(() => setO(false), [p]);
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200">
      <div className="hidden lg:block bg-forest text-stone-300 text-xs">
        <div className="wrap h-9 flex items-center justify-end gap-6">
          <a
            href="tel:+2348038330507"
            className="flex items-center gap-2 hover:text-white"
          >
            <Phone size={13} />
            +234 803 833 0507
          </a>
          <a
            href="mailto:zaydsengineeringconsult@gmail.com"
            className="flex items-center gap-2 hover:text-white"
          >
            <Mail size={13} />
            zaydsengineeringconsult@gmail.com
          </a>
        </div>
      </div>
      <div className="wrap h-16 lg:h-20 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="ZAYDS Engineering Consulting Limited, home"
        >
          <img
            src="/logo.jpeg"
            alt=""
            className="h-12 w-12 lg:h-14 lg:w-14 object-contain"
          />
          <span className="hidden lg:block leading-tight">
            <span className="block font-display text-xl text-forest">
              ZAYDS
            </span>
            <span className="block text-[10px] tracking-[0.2em] uppercase text-stone-500">
              Engineering Consulting
            </span>
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-9 text-sm font-medium">
          {L.map(([t, h]) => (
            <Link
              key={h}
              href={h}
              className={`hover:text-gold ${p === h ? "text-gold" : ""}`}
            >
              {t}
            </Link>
          ))}
          <Link href="/contact#quote" className="btn btn-gold !py-2.5">
            Request a quote
          </Link>
        </nav>
        <button
          className="lg:hidden p-2 -mr-2"
          onClick={() => setO(!o)}
          aria-expanded={o}
          aria-label={o ? "Close menu" : "Open menu"}
        >
          {o ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      {o && (
        <div className="lg:hidden border-t border-stone-200 bg-white">
          <div className="wrap py-3">
            {L.map(([t, h]) => (
              <Link
                key={h}
                href={h}
                className="block py-3.5 border-b border-stone-100 font-medium"
              >
                {t}
              </Link>
            ))}
            <Link
              href="/contact#quote"
              className="btn btn-gold w-full mt-5 mb-3"
            >
              Request a quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
