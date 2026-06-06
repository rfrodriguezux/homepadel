import { Heart, Users, Shield } from 'lucide-react';
import { AboutSection as AboutData } from '@/types';
import { getImageUrl } from '@/lib/utils';

const ICON_MAP: Record<string, React.ReactNode> = {
  Heart:  <Heart  size={18} strokeWidth={1.5} />,
  Users:  <Users  size={18} strokeWidth={1.5} />,
  Shield: <Shield size={18} strokeWidth={1.5} />,
};

const FALLBACK: AboutData = {
  title: 'Somos Home Pádel',
  description: 'Vivimos el pádel tanto como vos. Seleccionamos los mejores productos para que solo te enfoques en jugar tu mejor partido.',
  benefits: [
    { icon: 'Heart',  title: 'Pasión por el pádel',       description: 'Somos jugadores antes que vendedores' },
    { icon: 'Users',  title: 'Atención personalizada',     description: 'Te asesoramos según tu nivel y estilo' },
    { icon: 'Shield', title: 'Experiencia y confianza',    description: 'Años en el mercado del pádel argentino' },
  ],
};

interface Props {
  data?: AboutData | null;
}

// Renderiza el título coloreando "Home Pádel" en lime
function AboutTitle({ title }: { title: string }) {
  // Busca "Home Pádel" (case-insensitive) y colorea esa parte
  const match = title.match(/^(.*?)(Home Pádel|HOME PÁDEL)(.*)$/i);
  if (match) {
    return (
      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">
        <span className="text-white">{match[1].toUpperCase()}</span>
        <span className="text-[#C8FF00]">{match[2].toUpperCase()}</span>
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
    <section className="bg-[#111] border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Texto */}
          <div>
            <AboutTitle title={about.title} />

            <p className="text-gray-500 text-sm leading-relaxed mt-4 mb-8">
              {about.description}
            </p>

            <div className="flex flex-col gap-5">
              {about.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-[#C8FF00]/8 border border-[#C8FF00]/15 flex items-center justify-center text-[#C8FF00] flex-none">
                    {ICON_MAP[b.icon] ?? <Shield size={18} strokeWidth={1.5} />}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{b.title}</p>
                    <p className="text-gray-600 text-xs mt-0.5">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Imagen */}
          <div className="flex items-center justify-center">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={about.title}
                className="rounded-2xl w-full max-w-md object-cover shadow-2xl"
              />
            ) : (
              <div className="w-full max-w-md aspect-video rounded-2xl bg-[#1a1a1a] border border-white/8 flex flex-col items-center justify-center gap-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C8FF00]/3 to-transparent" />
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-xl bg-[#C8FF00]/8 border border-[#C8FF00]/15 flex items-center justify-center">
                    <span className="text-[#C8FF00] font-black text-lg">HP</span>
                  </div>
                  <p className="text-gray-700 text-xs uppercase tracking-widest text-center max-w-[180px]">
                    Subí una imagen desde el backoffice
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
