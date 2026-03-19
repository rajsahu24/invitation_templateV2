'use client';
import { useEffect, useState } from 'react';
import { usePreview } from '../../../../context/PreviewContext';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function DigitBlock({ value, label, isSeconds }: { value: number; label: string; isSeconds?: boolean }) {
  const display = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative flex items-center justify-center rounded-lg overflow-hidden"
        style={{
          width: 'clamp(64px, 18vw, 88px)',
          height: 'clamp(72px, 20vw, 96px)',
          background: 'hsl(var(--background))',
          border: '1px solid hsl(var(--border))',
          boxShadow: isSeconds
            ? '0 0 18px 2px hsla(43,72%,52%,0.35), inset 0 1px 0 rgba(255,255,255,0.6)'
            : '0 2px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
        }}
      >
        {/* top/bottom split line */}
        <div
          className="absolute left-0 right-0 z-10"
          style={{ top: '50%', height: '1px', background: 'hsl(var(--border))' }}
        />
        <span
          className="relative z-20 tabular-nums"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            fontWeight: 700,
            color: isSeconds ? 'hsl(var(--accent))' : 'hsl(var(--foreground))',
            letterSpacing: '0.05em',
            transition: isSeconds ? 'color 0.2s' : undefined,
          }}
        >
          {display}
        </span>
      </div>
      <span
        className="uppercase tracking-[0.2em] text-[10px]"
        style={{ fontFamily: 'var(--font-body)', color: 'hsl(var(--muted-foreground))' }}
      >
        {label}
      </span>
    </div>
  );
}

function Colon() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setVisible(v => !v), 500);
    return () => clearInterval(t);
  }, []);
  return (
    <span
      className="pb-6 text-2xl font-bold select-none"
      style={{
        color: 'hsl(var(--primary))',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.15s',
        fontFamily: 'var(--font-display)',
      }}
    >
      :
    </span>
  );
}

export function CountdownSection() {
  const { previewData } = usePreview();
  const countdownSection = previewData?.Countdown_section;
  const data = countdownSection?.data;
  const getFieldValue = (key: string) => (data && typeof data === 'object' ? (data as any)[key] : '') || '';



  const targetDate = data ? new Date(data.date_time) : new Date('2026-09-12T00:00:00');
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft(targetDate));

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(t);
  }, [targetDate.getTime()]);

  return (
    <section
      className="relative w-full py-14 px-4 flex flex-col items-center gap-8 overflow-hidden"
      style={{ background: 'hsl(var(--secondary))' }}
    >
      {/* Blurred background rings image */}
      <div
        className="absolute inset-0 z-50"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dwbed0m72/image/upload/v1773841977/XnZ8h-FBrgaM9JqowtpNqC-efFhPcPyfcW7bTKfPuQzlg_bZgPHxFMfMWgGChDlLSe9cwq8bcGn6Rc7ESo8XqliQDE_T8YqTOEysGSw6h2I_fnsepq.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(4px)',
          transform: 'scale(1.05)',
          opacity: 0.35,
        }}
      />
      {/* light wash so content stays readable */}
      <div className="absolute inset-0 z-0" style={{ background: 'hsl(var(--background) / 0.55)' }} />
      {/* heading */}
      <div className="relative z-50 flex flex-col items-center gap-2 text-center">
        <p
          className="uppercase tracking-[0.3em] text-[11px]"
          style={{ fontFamily: 'var(--font-body)', color: 'hsl(var(--muted-foreground))' }}
        >
          Counting down to
        </p>
        <h2
          className="text-3xl md:text-4xl"
          style={{ fontFamily: 'var(--font-script)', color: 'hsl(var(--foreground))' }}
        >
          Our Wedding Day
        </h2>
        {/* ornament */}
        <div className="flex items-center gap-3 mt-1 w-48">
          <div className="flex-1 h-px" style={{ background: 'hsl(var(--border))' }} />
          <span style={{ color: 'hsl(var(--accent))', fontSize: 10 }}>◆</span>
          <div className="flex-1 h-px" style={{ background: 'hsl(var(--border))' }} />
        </div>
      </div>

      {/* digit blocks */}
      <div className="relative z-10 flex items-end gap-2 md:gap-4">
        <DigitBlock value={timeLeft.days}    label="Days" />
        <Colon />
        <DigitBlock value={timeLeft.hours}   label="Hours" />
        <Colon />
        <DigitBlock value={timeLeft.minutes} label="Minutes" />
        <Colon />
        <DigitBlock value={timeLeft.seconds} label="Seconds" isSeconds />
      </div>

      {/* bottom label */}
      <p
        className="relative z-10 text-sm tracking-wide text-center"
        style={{ fontFamily: 'var(--font-body)', color: 'hsl(var(--muted-foreground))' }}
      >
        {targetDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
    </section>
  );
}
