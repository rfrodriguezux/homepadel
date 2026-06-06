'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, Plus, Trash2, Info, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { useToast } from '@/components/ui/Toast';

// ─── Types & Schema ───────────────────────────────────────────────────────────
const benefitSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1, 'Requerido'),
  description: z.string().min(1, 'Requerido'),
});

const schema = z.object({
  title: z.string().min(2, 'El título es requerido'),
  description: z.string().min(10, 'La descripción es requerida'),
  image: z.string().optional(),
  benefits: z.array(benefitSchema).min(1, 'Añadí al menos un ítem'),
  active: z.boolean().default(true),
});
type FormData = z.infer<typeof schema>;

const AVAILABLE_ICONS = [
  'Heart', 'Users', 'Shield', 'Star', 'Award', 'Zap', 'CheckCircle', 'Truck',
];

const inputClass = 'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8FF00]/40 focus:border-[#C8FF00]';

// ─── Page ────────────────────────────────────────────────────────────────────
export default function AboutConfigPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, control, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: 'Somos Home Pádel',
      description: 'Vivimos el pádel tanto como vos. Seleccionamos los mejores productos para que solo te enfoques en jugar tu mejor partido.',
      benefits: [
        { icon: 'Heart', title: 'Pasión por el pádel', description: 'Somos jugadores antes que vendedores' },
        { icon: 'Users', title: 'Atención personalizada', description: 'Te asesoramos según tu nivel y estilo' },
        { icon: 'Shield', title: 'Experiencia y confianza', description: 'Años en el mercado del pádel argentino' },
      ],
      active: true,
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'benefits' });
  const watchImage = watch('image');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/site-sections/about');
      const data = res.data?.data ?? res.data;
      if (data && typeof data === 'object') {
        reset({
          title: data.title ?? 'Somos Home Pádel',
          description: data.description ?? '',
          image: data.image ?? '',
          benefits: data.benefits ?? [],
          active: data.active !== false,
        });
      }
    } catch {
      // Keep defaults
    } finally {
      setLoading(false);
    }
  }, [reset]);

  useEffect(() => { load(); }, [load]);

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    try {
      await api.put('/site-sections/about', { data, active: data.active });
      toast('Sección "Sobre Nosotros" guardada', 'success');
    } catch {
      toast('Error al guardar', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/configuracion" className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Info className="w-5 h-5 text-[#C8FF00]" />
            Sobre Nosotros
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Sección &quot;Quiénes somos&quot; del inicio</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Info básica */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-800 border-b border-gray-100 pb-3">Contenido principal</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Título *</label>
            <input {...register('title')} className={inputClass} placeholder="Somos Home Pádel" />
            {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción *</label>
            <textarea {...register('description')} rows={4} className={inputClass} placeholder="Texto descriptivo sobre la empresa..." />
            {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Imagen (URL)</label>
            <input {...register('image')} className={inputClass} placeholder="https://..." />
            <p className="text-xs text-gray-400 mt-0.5">Si no hay imagen se muestra un placeholder con el logo.</p>
            {watchImage && (
              <div className="mt-2 w-40 aspect-square rounded-lg overflow-hidden border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={watchImage} alt="preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            )}
          </div>
        </div>

        {/* Benefits / items */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-sm font-semibold text-gray-800">Ítems de beneficios (columna de íconos)</h2>
            <button
              type="button"
              onClick={() => append({ icon: 'Star', title: '', description: '' })}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-[#0f172a] text-white rounded-lg hover:bg-[#1e293b] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Añadir ítem
            </button>
          </div>

          {fields.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-4">No hay ítems. Añadí al menos uno.</p>
          )}

          <div className="space-y-4">
            {fields.map((field, i) => (
              <div key={field.id} className="flex gap-3 p-4 bg-gray-50 rounded-lg items-start">
                <div className="grid grid-cols-3 gap-3 flex-1">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Ícono</label>
                    <select {...register(`benefits.${i}.icon`)} className={inputClass}>
                      {AVAILABLE_ICONS.map((ic) => (
                        <option key={ic} value={ic}>{ic}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Título</label>
                    <input {...register(`benefits.${i}.title`)} className={inputClass} placeholder="Ej: Pasión" />
                    {errors.benefits?.[i]?.title && (
                      <p className="text-xs text-red-600 mt-0.5">{errors.benefits[i]?.title?.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Descripción</label>
                    <input {...register(`benefits.${i}.description`)} className={inputClass} placeholder="Descripción corta" />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="p-1.5 mt-5 text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Estado + Guardar */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input type="checkbox" id="aboutActive" {...register('active')} className="w-4 h-4 rounded accent-[#C8FF00]" />
            <label htmlFor="aboutActive" className="text-sm text-gray-700 font-medium">Sección activa (visible en el inicio)</label>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#C8FF00] text-[#0f172a] rounded-lg font-semibold text-sm hover:bg-[#b8ef00] disabled:opacity-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </div>
  );
}
