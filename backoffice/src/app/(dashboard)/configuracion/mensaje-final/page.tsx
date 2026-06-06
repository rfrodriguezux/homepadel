'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, ArrowLeft, Megaphone } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { useToast } from '@/components/ui/Toast';

// ─── Schema ──────────────────────────────────────────────────────────────────
const schema = z.object({
  title: z.string().min(2, 'El título es requerido'),
  subtitle: z.string().optional(),
  ctaText: z.string().min(2, 'El texto del botón es requerido'),
  ctaUrl: z.string().min(1, 'La URL es requerida'),
  ctaSecondaryText: z.string().optional(),
  ctaSecondaryUrl: z.string().optional(),
  active: z.boolean().default(true),
});
type FormData = z.infer<typeof schema>;

const inputClass = 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8FF00]/40 focus:border-[#C8FF00]';

// ─── Page ────────────────────────────────────────────────────────────────────
export default function MensajeFinalConfigPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '¿Listo para jugar tu mejor partido?',
      subtitle: 'Explorá todo nuestro catálogo y encontrá lo que necesitás.',
      ctaText: 'Ver catálogo',
      ctaUrl: '/catalogo',
      ctaSecondaryText: '',
      ctaSecondaryUrl: '',
      active: true,
    },
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/site-sections/final_message');
      const data = res.data?.data ?? res.data;
      if (data && typeof data === 'object') {
        reset({
          title: data.title ?? '¿Listo para jugar tu mejor partido?',
          subtitle: data.subtitle ?? '',
          ctaText: data.ctaText ?? 'Ver catálogo',
          ctaUrl: data.ctaUrl ?? '/catalogo',
          ctaSecondaryText: data.ctaSecondaryText ?? '',
          ctaSecondaryUrl: data.ctaSecondaryUrl ?? '',
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
      await api.put('/site-sections/final_message', { data, active: data.active });
      toast('Mensaje final guardado', 'success');
    } catch {
      toast('Error al guardar', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/configuracion" className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-[#C8FF00]" />
            Mensaje Final
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Sección CTA al pie del inicio — fondo lima con botones</p>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-[#C8FF00] rounded-xl p-6 text-center">
        <p className="text-[10px] font-black uppercase tracking-widest text-[#555] mb-2">VISTA PREVIA</p>
        <h2 className="text-xl font-black uppercase text-[#111] leading-tight">
          {watch('title') || '¿Listo para jugar tu mejor partido?'}
        </h2>
        {watch('subtitle') && (
          <p className="text-[#444] text-sm mt-2">{watch('subtitle')}</p>
        )}
        <div className="flex items-center justify-center gap-3 mt-4">
          <span className="bg-[#111] text-white px-4 py-2 rounded text-xs font-black uppercase">
            {watch('ctaText') || 'Ver catálogo'}
          </span>
          {watch('ctaSecondaryText') && (
            <span className="border-2 border-[#111] text-[#111] px-4 py-2 rounded text-xs font-black uppercase">
              {watch('ctaSecondaryText')}
            </span>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-800 border-b border-gray-100 pb-3">Contenido</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Título *</label>
            <input {...register('title')} className={inputClass} placeholder="¿Listo para jugar tu mejor partido?" />
            {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Subtítulo / descripción</label>
            <textarea {...register('subtitle')} rows={2} className={inputClass} placeholder="Explorá todo nuestro catálogo..." />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-800 border-b border-gray-100 pb-3">Botón principal</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Texto del botón *</label>
              <input {...register('ctaText')} className={inputClass} placeholder="Ver catálogo" />
              {errors.ctaText && <p className="text-xs text-red-600 mt-1">{errors.ctaText.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">URL de destino *</label>
              <input {...register('ctaUrl')} className={inputClass} placeholder="/catalogo" />
              {errors.ctaUrl && <p className="text-xs text-red-600 mt-1">{errors.ctaUrl.message}</p>}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-800 border-b border-gray-100 pb-3">
            Botón secundario <span className="text-gray-400 font-normal">(opcional)</span>
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Texto</label>
              <input {...register('ctaSecondaryText')} className={inputClass} placeholder="Contactarnos" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">URL</label>
              <input {...register('ctaSecondaryUrl')} className={inputClass} placeholder="/contacto" />
            </div>
          </div>
          <p className="text-xs text-gray-400">Si está vacío, solo se muestra el botón principal.</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input type="checkbox" id="fmActive" {...register('active')} className="w-4 h-4 rounded accent-[#C8FF00]" />
            <label htmlFor="fmActive" className="text-sm text-gray-700 font-medium">Sección activa (visible en el inicio)</label>
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
