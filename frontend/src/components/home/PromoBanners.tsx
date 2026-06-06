import Link from 'next/link';
import { Banner } from '@/types';
import { getImageUrl } from '@/lib/utils';

interface Props {
  banners?: Banner[];
}

interface PromoConfig {
  tag: string;
  title: string;
  buttonText: string;
  buttonHref: string;
}

const FALLBACK: PromoConfig[] = [
  {
    tag: 'ZAPATILLAS',
    title: 'RENDIMIENTO\nEN CADA MOVIMIENTO',
    buttonText: 'VER ZAPATILLAS',
    buttonHref: '/catalogo?categoria=zapatillas',
  },
  {
    tag: 'PALETEROS',
    title: 'LLEVA TODO\nTU JUEGO',
    buttonText: 'VER PALETEROS',
    buttonHref: '/catalogo?categoria=paleteros',
  },
];

export default function PromoBanners({ banners }: Props) {
  const items =
    banners && banners.length >= 2
      ? banners.slice(0, 2).map((b, i) => ({
          tag:        b.subtitle  || FALLBACK[i]?.tag        || 'Promo',
          title:      b.title     || FALLBACK[i]?.title      || '',
          buttonText: (b as Banner & { ctaText?: string }).ctaText || FALLBACK[i]?.buttonText || 'VER MÁS',
          buttonHref: b.link      || FALLBACK[i]?.buttonHref || '/catalogo',
          image:      b.image ? getImageUrl(b.image) : null,
        }))
      : FALLBACK.map((f) => ({ ...f, image: null }));

  return (
    <section className="bg-[#0a0a0a] py-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, i) => {
            const titleLines = item.title.split(/\\n|\n/);

            return (
              <Link
                key={i}
                href={item.buttonHref}
                className="group relative overflow-hidden rounded-xl min-h-[260px] flex items-end p-8 cursor-pointer"
              >
                {/* Fondo */}
                {item.image ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-[#1a1a1a] transition-transform duration-500 group-hover:scale-105" />
                )}

                {/* Contenido */}
                <div className="relative z-10">
                  <p className="text-[#C8FF00] text-[10px] font-black uppercase tracking-[0.25em] mb-2">
                    {item.tag}
                  </p>
                  <h3 className="text-white font-black text-3xl md:text-4xl uppercase tracking-tight leading-none mb-5">
                    {titleLines.map((line, j) => (
                      <span key={j} className="block">{line}</span>
                    ))}
                  </h3>
                  <span className="inline-flex items-center gap-2 border border-white/40 text-white px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded group-hover:bg-white group-hover:text-[#111] group-hover:border-white transition-all duration-200">
                    {item.buttonText}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
