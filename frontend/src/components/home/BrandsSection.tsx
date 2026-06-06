'use client';

import { useRef, useEffect } from 'react';
import { Brand } from '@/types';
import { getImageUrl } from '@/lib/utils';

interface Props {
  brands?: Brand[];
}

const FALLBACK_BRANDS: { id: string; name: string }[] = [
  { id: 'nox',       name: 'NOX' },
  { id: 'babolat',   name: 'Babolat' },
  { id: 'bullpadel', name: 'Bullpadel' },
  { id: 'adidas',    name: 'adidas' },
  { id: 'wilson',    name: 'Wilson' },
  { id: 'siux',      name: 'Siux' },
  { id: 'head',      name: 'HEAD' },
];

interface SlotProps {
  id: string;
  name: string;
  logo?: string;
  url?: string;
  suffix?: string;
}

function BrandSlot({ id, name, logo, url, suffix = '' }: SlotProps) {
  const key = id + suffix;
  const inner = logo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={getImageUrl(logo)}
      alt={name}
      className="h-6 md:h-8 w-auto object-contain brightness-0 invert opacity-40 hover:opacity-80 transition-all duration-300"
    />
  ) : (
    <span className="text-white/30 font-black text-sm uppercase tracking-wider hover:text-white/70 transition-colors whitespace-nowrap cursor-default select-none">
      {name}
    </span>
  );

  return (
    <div key={key} className="flex items-center justify-center flex-none px-8 md:px-12">
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  );
}

export default function BrandsSection({ brands }: Props) {
  const hasBrands = brands && brands.length > 0;
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const SPEED = 0.5;

    const step = () => {
      if (!pausedRef.current) {
        const half = track.scrollWidth / 2;
        posRef.current = (posRef.current + SPEED) % half;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);

    const onEnter = () => { pausedRef.current = true; };
    const onLeave = () => { pausedRef.current = false; };

    track.addEventListener('mouseenter', onEnter);
    track.addEventListener('mouseleave', onLeave);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      track.removeEventListener('mouseenter', onEnter);
      track.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const renderSlots = (suffix: string) =>
    hasBrands
      ? brands!.map((b) => (
          <BrandSlot key={b.id + suffix} id={b.id} name={b.name} logo={b.logo} url={b.url} suffix={suffix} />
        ))
      : FALLBACK_BRANDS.map((b) => (
          <BrandSlot key={b.id + suffix} id={b.id} name={b.name} suffix={suffix} />
        ));

  return (
    <section className="bg-[#0a0a0a] border-t border-white/5 py-10 overflow-hidden">
      {/* Título centrado */}
      <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-white/25 mb-8">
        MARCAS QUE CONFÍAN EN NOSOTROS
      </p>

      {/* Slider continuo */}
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex will-change-transform">
          {renderSlots('')}
          {renderSlots('-dup')}
        </div>
      </div>
    </section>
  );
}
