'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { useToast } from '@/components/ui/Toast';

// ─── Schema ──────────────────────────────────────────────────────────────────
const schema = z.object({
  title: z.string().min(2, 'El título es requerido'),
  username: z.string().min(2, 'El usuario es requerido').refine((v) => v.startsWith('@'), {
    message: 'Debe comenzar con @',
  }),
  buttonText: z.string().min(2, 'El texto del botón es requerido'),
  buttonUrl: z.string().url('Debe ser una URL válida'),
  active: z.boolean().default(true),
});
type FormData = z.infer<typeof schema>;

const inputClass = 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8FF00]/40 focus:border-[#C8FF00]';

// ─── Page ────────────────────────────────────────────────────────────────────
export default function InstagramConfigPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: 'Seguinos en Instagram',
      username: '@homepadel',
      buttonText: 'Ver perfil',
      buttonUrl: 'https://instagram.com/homepadel',
      active: true,
    },
  });

  const watchUrl = watch('buttonUrl');
  const watchUsername = watch('username');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/site-sections/instagram');
      const data = res.data?.data ?? res.data;
      if (data && typeof data === 'object') {
        reset({
          title: data.title ?? 'Seguinos en Instagram',
          username: data.username ?? '@homepadel',
          buttonText: data.buttonText ?? 'Ver perfil',
          buttonUrl: data.buttonUrl ?? 'https://instagram.com/homepadel',
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
      await api.put('/site-sections/instagram', { data, active: data.active });
      toast('Configuración de Instagram guardada', 'success');
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
          <h1 className="text-2xl font-bold text-gray-900">Instagram</h1>
          <p className="text-gray-500 text-sm mt-0.5">Configuración de la sección Instagram del inicio</p>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-[#0f172a] rounded-xl p-5 flex items-center justify-between">
        <div>
          <p className="text-[#C8FF00] text-xs font-bold uppercase tracking-widest mb-1">Vista previa</p>
          <p className="text-white font-black text-lg">{watch('title') || 'Seguinos en Instagram'}</p>
        </div>
        {watchUrl && (
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#C8FF00] text-[#0f172a] px-4 py-2 rounded-full font-bold text-sm"
          >
            {watchUsername || '@homepadel'}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-800 border-b border-gray-100 pb-3">Datos de la sección</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Título de la sección *</label>
            <input {...register('title')} className={inputClass} placeholder="Seguinos en Instagram" />
            {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Usuario de Instagram *</label>
            <input {...register('username')} className={inputClass} placeholder="@homepadel" />
            {errors.username && <p className="text-xs text-red-600 mt-1">{errors.username.message}</p>}
            <p className="text-xs text-gray-400 mt-0.5">Incluí el @ al inicio.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Texto del botón *</label>
            <input {...register('buttonText')} className={inputClass} placeholder="Ver perfil" />
            {errors.buttonText && <p className="text-xs text-red-600 mt-1">{errors.buttonText.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">URL del perfil *</label>
            <input {...register('buttonUrl')} className={inputClass} placeholder="https://instagram.com/homepadel" />
            {errors.buttonUrl && <p className="text-xs text-red-600 mt-1">{errors.buttonUrl.message}</p>}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input type="checkbox" id="igActive" {...register('active')} className="w-4 h-4 rounded accent-[#C8FF00]" />
            <label htmlFor="igActive" className="text-sm text-gray-700 font-medium">Sección activa (visible en el inicio)</label>
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
