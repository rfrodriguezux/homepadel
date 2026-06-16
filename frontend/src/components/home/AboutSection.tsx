import { Heart, Users, Shield } from 'lucide-react';
import { AboutSection as AboutData } from '@/types';
import { getImageUrl } from '@/lib/utils';
import BrandLogo from '@/components/ui/BrandLogo';

const ICON_MAP: Record<string, React.ReactNode> = {
  Heart:  <Heart  size={20} strokeWidth={1.5} />,
  Users:  <Users  size={20} strokeWidth={1.5} />,
  Shield: <Shield size={20} strokeWidth={1.5} />,
};

const FALLBACK: AboutData = {
  title: 'Somos Home Pádel',
  description: 'Vivimos el pádel tanto como vos. Seleccionamos los mejores productos para que solo te enfoques en jugar tu mejor partido.',
  benefits: [
    { icon: 'Heart',  title: 'Pasión por el pádel',    description: 'Somos jugadores antes que vendedores' },
    { icon: 'Users',  title: 'Atención personalizada',  description: 'Te asesoramos según tu nivel y estilo' },
    { icon: 'Shield', title: 'Experiencia y confianza', description: 'Años en el mercado del pádel argentino' },
  ],
};

interface Props {
  data?: AboutData | null;
}

/** Renderiza el título con "Home Pádel" en acento lime */
function AboutTitle({ title }: { title: string }) {
  const match = title.match(/^(.*?)(Home Pádel|HOME PÁDEL)(.*)$/i);
  if (match) {
    return (
      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">
        <span className="text-white">{match[1].toUpperCase()}</span>
        <span className="text-[#D4FF00]">{match[2].toUpperCase()}</span>
        <span className="text-white">{match[3].toUpperCase()}</span>
      </h2>
    );
  }
  return (
    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-tight">
      {title.toUpperCase()}
    </h2>
  );
}

export default function AboutSection({ data }: Props) {
  const about = data ?? FALLBACK;
  const imageUrl = about.image ? getImageUrl(about.image) : null;

  return (
    <section className="bg-[#0A0A0A] border-t border-white/[0.06] py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* ── Texto ── */}
          <div>
            <AboutTitle title={about.title} />
            <p className="text-[#A1A1AA] text-sm leading-relaxed mt-4 mb-8 max-w-md">
              {about.description}
            </p>

            {/* Beneficios en FILA HORIZONTAL (como el mockup) */}
            <div className="flex flex-col sm:flex-row gap-6">
              {about.benefits.map((b, i) => (
                <div key={i} className="flex flex-col items-start gap-2">
                  <div className="w-9 h-9 rounded-lg bg-[#D4FF00]/[0.08] border border-[#D4FF00]/[0.12] flex items-center justify-center text-[#D4FF00] flex-none">
                    {ICON_MAP[b.icon] ?? <Shield size={20} strokeWidth={1.5} />}
                  </div>
                  <div>
                    <p className="text-white font-bold text-xs uppercase tracking-wide leading-snug">{b.title}</p>
                    {b.description && (
                      <p className="text-[#A1A1AA] text-xs mt-0.5 leading-snug">{b.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Imagen ── */}
          <div className="flex items-center justify-center relative">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={about.title}
                className="rounded-xl w-full object-cover shadow-2xl"
              />
            ) : (
              /* Placeholder — padel court oscuro */
              <div className="w-full aspect-video rounded-xl bg-[#121212] border border-white/[0.08] flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4FF00]/[0.04] via-transparent to-transparent" />
                {/* Court lines decorativas */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <div className="w-3/4 h-2/3 border-2 border-white rounded-sm" />
                  <div className="absolute w-3/4 h-px bg-white" />
                </div>
                {/* Logo oficial como identidad visual */}
                <div className="relative z-10">
                  <BrandLogo variant="dark" size="sm" showText={true} />
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
