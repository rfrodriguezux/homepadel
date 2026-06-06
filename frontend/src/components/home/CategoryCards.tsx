import Link from 'next/link';
import { Category } from '@/types';
import { getImageUrl } from '@/lib/utils';

const FALLBACK_CATEGORIES = [
  { id: '1', name: 'Palas',        slug: 'paletas' },
  { id: '2', name: 'Zapatillas',   slug: 'zapatillas' },
  { id: '3', name: 'Indumentaria', slug: 'indumentaria' },
  { id: '4', name: 'Paleteros',    slug: 'paleteros' },
  { id: '5', name: 'Accesorios',   slug: 'accesorios' },
];

interface Props {
  categories?: Category[];
}

export default function CategoryCards({ categories }: Props) {
  const items =
    categories && categories.length > 0
      ? categories.slice(0, 5)
      : FALLBACK_CATEGORIES;

  return (
    <section className="bg-[#0a0a0a] py-14">
      <div className="max-w-7xl mx-auto px-4">
        {/* Encabezado */}
        <div className="mb-7">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
            CATEGORÍAS
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Encontrá lo que necesitás para tu mejor versión en la cancha.
          </p>
        </div>

        {/* Grid — 5 columnas en desktop, 2 en mobile */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {items.map((cat) => {
            const imgUrl = (cat as Category).image ? getImageUrl((cat as Category).image!) : null;

            return (
              <Link
                key={cat.slug}
                href={`/catalogo?categoria=${cat.slug}`}
                className="group relative overflow-hidden rounded-xl aspect-[3/4] flex flex-col items-end justify-end cursor-pointer"
              >
                {/* Fondo: imagen real o placeholder dark */}
                {imgUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imgUrl}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#1a1a1a] transition-transform duration-500 group-hover:scale-105" />
                )}

                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Texto */}
                <div className="relative z-10 w-full p-3">
                  <p className="text-white font-black text-sm uppercase tracking-wide leading-none">
                    {cat.name.toUpperCase()}
                  </p>
                  <p className="text-gray-500 text-[10px] font-medium mt-1 group-hover:text-[#D4FF00] transition-colors duration-200 flex items-center gap-1 uppercase tracking-wider">
                    VER PRODUCTOS
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </p>
                </div>

                {/* Borde lime animado */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4FF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
