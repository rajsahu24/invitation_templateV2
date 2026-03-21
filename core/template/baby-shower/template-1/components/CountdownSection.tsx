import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MoonIcon, StarIcon } from './Illustrations';
import { usePreview } from '../../../../context/PreviewContext';

interface SectionProps { onBack: () => void; }

export function CountdownSection({ onBack }: SectionProps) {
  const { previewData } = usePreview();
  const heroData   = (previewData as any)?.hero_section?.data;
  const heroSchema = (previewData as any)?.hero_section?.schema;
  const eventData  = (previewData as any)?.event_section?.data;

  const get = (key: string) => (heroData && typeof heroData === 'object' ? (heroData as any)[key] : '') || '';

  let rawDate = '';
  if (heroData && typeof heroData === 'object') {
    if (heroSchema?.fields) {
      const find = (kws: string[]) =>
        heroSchema.fields.find((f: any) => kws.some((k: string) => f.key.toLowerCase().includes(k)));
      rawDate = get(find(['date'])?.key ?? '');
    } else {
      rawDate = get('date') || get('wedding_date');
    }
  }
  if (!rawDate && Array.isArray(eventData) && eventData.length > 0) {
    rawDate = eventData[0]?.date_time || eventData[0]?.start_time || '';
  }

  const targetDate = rawDate ? new Date(rawDate) : new Date('2026-06-14T14:00:00');

  const calc = () => {
    const diff = Math.max(0, targetDate.getTime() - Date.now());
    return {
      days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calc());
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(t);
  }, [targetDate.getTime()]);

  const units = [
    { label: 'Days',    value: timeLeft.days },
    { label: 'Hours',   value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl mx-auto bg-gradient-to-b from-[var(--lavender-light)] to-[var(--blush-light)] rounded-3xl p-8 shadow-xl border border-white/60 relative overflow-hidden"
    >
      <MoonIcon className="absolute top-8 right-8 w-16 h-16 opacity-40" color="var(--gold)" />
      <StarIcon className="absolute top-12 left-12 w-6 h-6 opacity-50" color="var(--gold)" />
      <StarIcon className="absolute bottom-16 right-20 w-8 h-8 opacity-40" color="var(--gold)" />
      <StarIcon className="absolute bottom-12 left-16 w-5 h-5 opacity-60" color="var(--gold)" />

      <button onClick={onBack} className="flex items-center gap-2 text-[var(--text-dark)] hover:text-[var(--mauve)] transition-colors mb-8 relative z-10">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        <span className="text-lg">Back</span>
      </button>

      <div className="text-center relative z-10">
        <h2 className="text-5xl text-[var(--gold-dark)] mb-4">Counting Down to Baby</h2>
        <p className="text-xl text-[var(--text-dark)] mb-12 italic">We can't wait to meet our little one!</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {units.map((unit) => (
            <div key={unit.label} className="flex flex-col items-center">
              <motion.div
                key={unit.value}
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-full aspect-square bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-md border border-white mb-3"
              >
                <span className="text-5xl md:text-6xl text-[var(--mauve)] font-semibold">
                  {unit.value.toString().padStart(2, '0')}
                </span>
              </motion.div>
              <span className="text-lg tracking-widest uppercase text-[var(--text-dark)] font-medium">{unit.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
