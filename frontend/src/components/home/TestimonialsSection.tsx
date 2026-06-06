'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial } from '@/types';
import { getImageUrl } from '@/lib/utils';

const FALLBACK: Testimonial[] = [
  { id: '1', name: 'Martín R.',    comment: 'Excelentes productos y atención. La pala llegó perfecta y original. Me llegó rapidísimo, 100% recomendables.', rating: 5, order: 1, active: true },
  { id: '2', name: 'Agustina L.', comment: 'Muy buena experiencia de compra. El asesoramiento fue clave para elegir mis zapatillas. Muy conforme.',          rating: 5, order: 2, active: true },
  { id: '3', name: 'Lucas G.',     comment: 'Tienen lo mejor en pádel. Volvería a comprar sin dudas. El envío llegó antes de lo esperado.',                  rating: 5, order: 3, active: true },
];

interface Props {
  testimonials?: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection({ testimonials }: Props) {
  const items = testimonials && testimonials.length > 0 ? testimonials : FALLBACK;
  const [current, setCurrent] = useState(0);
  const isMulti = items.length > 3;

  const next = () => setCurrent((c) => (c + 1) % items.length);
  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);

  return (
    <section className="bg-[#0a0a0a] border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <span className="w-1 h-7 bg-[#C8FF00] rounded-full flex-none" />
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
              LO QUE DICEN NUESTROS CLIENTES
            </h2>
          </div>
          {isMulti && (
            <div className="flex gap-2">
              <button onClick={prev} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/8 transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button onClick={next} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/8 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {(isMulti
            ? items.slice(current, current + 3).concat(items.slice(0, Math.max(0, current + 3 - items.length)))
            : items
          ).map((t) => (
            <div key={t.id} className="bg-[#111] rounded-2xl p-6 flex flex-col gap-4 border border-white/5">
              <StarRating rating={t.rating} />
              <p className="text-gray-400 text-sm leading-relaxed flex-1">
                &ldquo;{t.comment}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                {t.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={getImageUrl(t.photo)}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center flex-none">
                    <span className="text-[#C8FF00] font-black text-xs">
                      {t.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-bold text-sm text-white">{t.name}</p>
                  <p className="text-gray-600 text-xs">Cliente verificado</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        {isMulti && (
          <div className="flex justify-center gap-2 mt-6">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? 'w-5 h-1.5 bg-[#C8FF00]' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Ir al testimonio ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
