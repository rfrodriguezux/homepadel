'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, getDiscountPercent, getImageUrl } from '@/lib/utils';

interface Props {
  products: Product[];
}

function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [wished, setWished] = useState(false);
  const [adding, setAdding] = useState(false);

  const hasDiscount = product.salePrice !== undefined && product.salePrice < product.price;
  const discountPct = hasDiscount ? getDiscountPercent(product.price, product.salePrice!) : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock === 0 || adding) return;
    setAdding(true);
    addItem(product);
    setTimeout(() => setAdding(false), 900);
  };

  const handleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWished(!wished);
  };

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="bg-[#1a1a1a] rounded-xl border border-white/8 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden group block"
    >
      {/* Imagen */}
      <div className="relative aspect-square bg-[#111] overflow-hidden">
        {product.images && product.images.length > 0 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getImageUrl(product.images[0])}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#111]">
            <span className="text-3xl font-black text-white/8">
              {product.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {hasDiscount && (
            <span className="bg-[#e53e3e] text-white text-xs font-black px-2 py-0.5 rounded-full">
              -{discountPct}%
            </span>
          )}
          {product.isNew && !hasDiscount && (
            <span className="bg-[#C8FF00] text-[#111] text-xs font-black px-2 py-0.5 rounded-full">
              NUEVO
            </span>
          )}
          {product.isOffer && !hasDiscount && (
            <span className="bg-white text-[#111] text-xs font-black px-2 py-0.5 rounded-full">
              OFERTA
            </span>
          )}
        </div>

        <button
          onClick={handleWish}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center z-10 transition-all duration-200 ${
            wished ? 'bg-red-500 text-white' : 'bg-black/50 text-gray-500 hover:text-red-400'
          }`}
          aria-label={wished ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart size={13} fill={wished ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-1">
        {product.brand && (
          <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">
            {product.brand.name}
          </p>
        )}

        <h3 className="font-bold text-sm text-white leading-snug line-clamp-2 uppercase">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2 mt-1">
          {hasDiscount ? (
            <>
              <span className="text-lg font-black text-white">
                {formatPrice(product.salePrice!)}
              </span>
              <span className="text-xs text-gray-600 line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-black text-white">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Cuotas */}
        {product.price >= 10000 && (
          <p className="text-xs text-[#C8FF00] font-medium">
            Hasta 9 cuotas sin interés
          </p>
        )}

        <button
          onClick={handleAdd}
          disabled={product.stock === 0 || adding}
          className={`mt-2 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-black uppercase tracking-wide transition-all duration-200 ${
            product.stock === 0
              ? 'bg-white/5 text-gray-600 cursor-not-allowed'
              : adding
              ? 'bg-[#C8FF00] text-[#111] scale-95'
              : 'bg-[#111] border border-white/10 text-white hover:border-[#C8FF00] hover:text-[#C8FF00]'
          }`}
        >
          <ShoppingCart size={13} />
          {product.stock === 0 ? 'Sin stock' : adding ? '¡Agregado! ✓' : 'COMPRAR'}
        </button>
      </div>
    </Link>
  );
}

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'NOX AT10 Genius WR 2024',  slug: 'nox-at10-genius-wr-2024', price: 550000, salePrice: undefined, sku: 'NOX-001', stock: 8,  images: [], featured: true, isNew: false, isOffer: false, description: '', category: { id: '1', name: 'Paletas', slug: 'paletas' }, brand: { id: '1', name: 'NOX',      slug: 'nox' } },
  { id: '2', name: 'Bullpadel Hack 04 2024',   slug: 'bullpadel-hack-04-2024',  price: 525000, salePrice: undefined, sku: 'BUL-001', stock: 12, images: [], featured: true, isNew: true,  isOffer: false, description: '', category: { id: '1', name: 'Paletas', slug: 'paletas' }, brand: { id: '2', name: 'Bullpadel', slug: 'bullpadel' } },
  { id: '3', name: 'Adidas Metalbone 3.3 2025', slug: 'adidas-metalbone-3-3',   price: 530000, salePrice: undefined, sku: 'ADI-001', stock: 6,  images: [], featured: true, isNew: false, isOffer: true,  description: '', category: { id: '1', name: 'Paletas', slug: 'paletas' }, brand: { id: '3', name: 'Adidas',    slug: 'adidas' } },
  { id: '4', name: 'Paletero NOX AT10 Team',   slug: 'paletero-nox-at10-team',  price: 210000, salePrice: undefined, sku: 'NOX-002', stock: 4,  images: [], featured: true, isNew: false, isOffer: false, description: '', category: { id: '2', name: 'Paleteros', slug: 'paleteros' }, brand: { id: '4', name: 'NOX',     slug: 'nox' } },
];

export default function FeaturedProducts({ products }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? 300 : -300, behavior: 'smooth' });
  };

  const displayProducts = products && products.length > 0 ? products : MOCK_PRODUCTS;

  return (
    <section className="bg-[#0a0a0a] py-14 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
              LAS MÁS VENDIDAS DEL MES
            </h2>
            <p className="text-gray-600 text-sm mt-0.5">Elegidas por nuestra comunidad.</p>
          </div>
          <Link
            href="/catalogo"
            className="text-sm font-bold text-gray-500 hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider"
          >
            VER TODOS
            <ChevronRight size={14} />
          </Link>
        </div>

        {/* Carrusel */}
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-8 h-8 bg-[#1a1a1a] border border-white/10 rounded-full flex items-center justify-center text-white hover:border-white/30 transition-colors hidden md:flex"
            aria-label="Ver anteriores"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4L7 9l5 5"/>
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-1"
            style={{ scrollbarWidth: 'none', scrollSnapType: 'x mandatory' }}
          >
            {displayProducts.map((product) => (
              <div
                key={product.id}
                className="flex-none w-60 md:w-[240px]"
                style={{ scrollSnapAlign: 'start' }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-8 h-8 bg-[#1a1a1a] border border-white/10 rounded-full flex items-center justify-center text-white hover:border-white/30 transition-colors hidden md:flex"
            aria-label="Ver más"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
