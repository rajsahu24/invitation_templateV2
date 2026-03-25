import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MotherBabyIllustration, MoonIcon, StarIcon } from './Illustrations';
import { usePreview } from '../../../../context/PreviewContext';

function useCountdown(targetDate: Date) {
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
  return timeLeft;
}

export function HeroSection() {
  const { previewData } = usePreview();
  const heroSection = (previewData as any)?.hero_section;
  const data = heroSection?.data;
  const schema = heroSection?.schema;
  const eventData = (previewData as any)?.countdown_section?.data;

  const get = (key: string) => (data && typeof data === 'object' ? (data as any)[key] : '') || '';

  let honoree = '', tagLine = '', rawDate = '';
  if (data && typeof data === 'object') {
    if (schema?.fields) {
      const find = (kws: string[]) =>
        schema.fields.find((f: any) => kws.some((k: string) => f.key.toLowerCase()?.includes(k)));
      honoree = get(find(['honoree', 'name', 'bride', 'mom'])?.key ?? '');
      tagLine  = get(find(['tag', 'line', 'subtitle','title'])?.key ?? '');
    } else {
      honoree = get('honoree_name') || get('name') || get('bride_name');
      tagLine  = get('tag_line') || get('invitation_tag_line') || get('subtitle') || get('title');
    }
  }

  rawDate = eventData?.date_time

  const targetDate = rawDate ? new Date(rawDate) : new Date('2026-06-14T14:00:00');
  const timeLeft = useCountdown(targetDate);

  const units = [
    { label: 'Days',    value: timeLeft.days },
    { label: 'Hours',   value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  const displayHonoree = honoree || 'Emma';
  const displayTagLine = tagLine  || 'A Baby Shower Celebration';

  return (
    <div className="relative w-full flex flex-col items-center justify-center pt-12 pb-8 text-center">
      {/* Animated floating stars & moon */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <StarIcon className="absolute top-10 left-10 w-4 h-4" color="#D4A84B"
          style={{ animation: 'sparkle 3s infinite 0.5s' }} />
        <StarIcon className="absolute top-32 right-12 w-6 h-6" color="#EEBCB0"
          style={{ animation: 'sparkle 4s infinite 1s' }} />
        <StarIcon className="absolute bottom-20 left-20 w-5 h-5" color="#C4B0D8"
          style={{ animation: 'sparkle 3.5s infinite 0.2s' }} />
        <StarIcon className="absolute top-1/2 right-20 w-3 h-3" color="#D4A84B"
          style={{ animation: 'sparkle 2.5s infinite 1.5s' }} />
        <StarIcon className="absolute bottom-40 right-10 w-4 h-4" color="#EEBCB0"
          style={{ animation: 'sparkle 3s infinite 2s' }} />
        <MoonIcon className="absolute top-20 right-1/4 w-8 h-8" color="#D4A84B"
          style={{ animation: 'gentleFloat 6s infinite ease-in-out' }} />
        <MoonIcon className="absolute bottom-32 left-1/4 w-6 h-6" color="#C4B0D8"
          style={{ animation: 'gentleFloat 8s infinite ease-in-out 1s', opacity: 0.5 }} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 mb-6"
      >
        <MotherBabyIllustration className="w-64 h-72 drop-shadow-sm" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 flex flex-col items-center"
      >
        <h1 className="text-5xl md:text-6xl text-[var(--gold-dark)] mb-2 drop-shadow-sm">
          Welcome Little One
        </h1>

        <div className="flex items-center gap-4 my-3 w-full max-w-xs justify-center">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-50" />
          <span className="text-[var(--gold)]">✦</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-50" />
        </div>

        <p className="text-xl md:text-2xl text-[var(--text-dark)] tracking-wide">
          {displayTagLine} for {displayHonoree}
        </p>
      </motion.div>

      {/* Countdown clock */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="relative z-10 mt-10 w-full max-w-sm"
      >
        <p className="text-lg text-[var(--mauve)] italic mb-4">Counting down to the big day…</p>
        <div className="grid grid-cols-4 gap-3">
          {units.map((unit) => (
            <div key={unit.label} className="flex flex-col items-center">
              <motion.div
                key={unit.value}
                initial={{ scale: 0.85, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-full aspect-square bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-md border border-white mb-2"
              >
                <span className="text-3xl md:text-4xl text-[var(--mauve)] font-semibold">
                  {unit.value.toString().padStart(2, '0')}
                </span>
              </motion.div>
              <span className="text-xs tracking-widest uppercase text-[var(--text-dark)]">{unit.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
