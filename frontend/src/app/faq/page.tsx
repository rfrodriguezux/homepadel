import Link from 'next/link';
import { MessageCircle, ChevronDown } from 'lucide-react';

export const metadata = {
  title: 'Preguntas Frecuentes | Home Pádel',
  description: 'Encontrá respuestas a las preguntas más frecuentes sobre compras, envíos, devoluciones y más.',
};

const FAQS = [
  {
    category: 'COMPRAS',
    items: [
      {
        q: '¿Cómo realizo una compra?',
        a: 'Podés comprar directamente desde nuestra web: elegís el producto, lo añadís al carrito y completás el proceso de pago con los métodos disponibles.',
      },
      {
        q: '¿Necesito crear una cuenta para comprar?',
        a: 'No es obligatorio, podés comprar como invitado. Sin embargo, registrarte te permite hacer seguimiento de tus pedidos y tener acceso a promociones exclusivas.',
      },
      {
        q: '¿Cómo sé que mi compra fue exitosa?',
        a: 'Una vez completado el pago, recibirás un email de confirmación con el detalle de tu pedido y el número de seguimiento.',
      },
    ],
  },
  {
    category: 'ENVÍOS',
    items: [
      {
        q: '¿A qué zonas hacen envíos?',
        a: 'Enviamos a todo el país a través de nuestros operadores logísticos. Para CABA y GBA ofrecemos envío express en 24/48 hs.',
      },
      {
        q: '¿Cuánto tarda en llegar mi pedido?',
        a: 'CABA y GBA: 1 a 3 días hábiles. Interior del país: 3 a 7 días hábiles según la zona.',
      },
      {
        q: '¿Los envíos tienen costo?',
        a: 'El costo de envío varía según la zona y el peso del pedido. Los pedidos superiores a $100.000 tienen envío gratis a CABA y GBA.',
      },
      {
        q: '¿Puedo retirar mi pedido en el local?',
        a: 'Sí, ofrecemos retiro en nuestro local sin costo adicional. Una vez listo, te avisamos por email o WhatsApp.',
      },
    ],
  },
  {
    category: 'PAGOS',
    items: [
      {
        q: '¿Qué medios de pago aceptan?',
        a: 'Aceptamos tarjetas de crédito (Visa, Mastercard, American Express), tarjetas de débito, Mercado Pago y transferencia bancaria.',
      },
      {
        q: '¿Puedo pagar en cuotas?',
        a: 'Sí, ofrecemos hasta 6 cuotas sin interés con las principales tarjetas de crédito. Consultá las promociones vigentes en nuestra sección de medios de pago.',
      },
      {
        q: '¿Es seguro pagar en la web?',
        a: 'Sí, todas las transacciones están protegidas con certificado SSL y procesadas a través de plataformas seguras certificadas.',
      },
    ],
  },
  {
    category: 'DEVOLUCIONES Y CAMBIOS',
    items: [
      {
        q: '¿Puedo devolver un producto?',
        a: 'Sí, tenés 30 días desde la recepción del producto para solicitar un cambio o devolución, siempre que esté sin uso y en su embalaje original.',
      },
      {
        q: '¿Cómo solicito una devolución?',
        a: 'Contactanos por WhatsApp o email con tu número de pedido y el motivo de la devolución. Nuestro equipo te guiará en el proceso.',
      },
      {
        q: '¿Me devuelven el dinero?',
        a: 'Podés elegir entre cambio por otro producto del mismo valor o reintegro del dinero. El reintegro se procesa en 3 a 5 días hábiles.',
      },
    ],
  },
  {
    category: 'PRODUCTOS',
    items: [
      {
        q: '¿Los productos tienen garantía?',
        a: 'Todos nuestros productos cuentan con garantía del fabricante. Las paletas tienen garantía de 3 a 12 meses según la marca.',
      },
      {
        q: '¿Cómo elijo el tamaño correcto de paleta?',
        a: 'Contamos con una guía de talles detallada. En general, te recomendamos considerar tu nivel de juego y estilo (control vs. potencia).',
      },
      {
        q: '¿Los precios son con IVA incluido?',
        a: 'Sí, todos nuestros precios publicados incluyen IVA y demás impuestos correspondientes.',
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">

      {/* BREADCRUMB */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-1.5 text-[11px] text-[#A1A1AA]">
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-white">Preguntas Frecuentes</span>
        </div>
      </div>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 py-12 lg:py-16 text-center">
        <p className="text-[#D4FF00] text-xs font-black uppercase tracking-[0.2em] mb-3">SOPORTE</p>
        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
          Preguntas Frecuentes
        </h1>
        <p className="text-[#A1A1AA] text-base leading-relaxed max-w-xl mx-auto">
          Encontrá respuestas a las dudas más comunes. Si no encontrás lo que buscás,
          no dudes en contactarnos.
        </p>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        {FAQS.map((section) => (
          <div key={section.category} className="mb-12">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#D4FF00] mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-[#D4FF00]" />
              {section.category}
            </h2>
            <div className="space-y-3">
              {section.items.map((item, i) => (
                <div key={i} className="bg-[#121212] border border-white/[0.08] rounded-2xl overflow-hidden">
                  <details className="group">
                    <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer select-none list-none">
                      <span className="text-white font-semibold text-sm">{item.q}</span>
                      <ChevronDown
                        size={16}
                        className="text-[#A1A1AA] flex-none transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <div className="px-6 pb-5">
                      <p className="text-[#A1A1AA] text-sm leading-relaxed">{item.a}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.06] py-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-white font-black text-xl mb-2">¿No encontraste lo que buscabas?</h3>
          <p className="text-[#A1A1AA] text-sm mb-6">Nuestro equipo está disponible de Lunes a Viernes de 9 a 18 hs.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/5491131813297"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-black text-sm rounded-xl hover:bg-green-400 transition-colors"
            >
              <MessageCircle size={16} />
              Escribinos por WhatsApp
            </a>
            <Link
              href="/contacto"
              className="flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] border border-white/20 text-white font-bold text-sm rounded-xl hover:border-white/40 transition-colors"
            >
              Ir al formulario de contacto
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
