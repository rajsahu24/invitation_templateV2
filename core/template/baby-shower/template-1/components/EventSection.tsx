import React from 'react';
import { motion } from 'framer-motion';
import { BotanicalBranch } from './Illustrations';
import { usePreview } from '../../../../context/PreviewContext';

interface SectionProps { onBack: () => void; }

export function EventSection({ onBack }: SectionProps) {
  const { previewData } = usePreview();
  const heroData  = (previewData as any)?.event_section?.data;
  const heroSchema = (previewData as any)?.event_section?.schema;
  const eventData  = (previewData as any)?.event_section?.data;
  const dressData  = (previewData as any)?.event_section?.data;

  const get = (obj: any, key: string) => (obj && typeof obj === 'object' ? obj[key] : '') || '';

  let date = '', time = '', venueName = '', venueAddress = '';

  if (heroData && typeof heroData === 'object') {
    if (heroSchema?.fields) {
      const find = (kws: string[]) =>
        heroSchema.fields.find((f: any) => kws.some((k: string) => f.key.toLowerCase().includes(k)));
      const dateVal = get(heroData, find(['date'])?.key ?? '');
      if (dateVal) {
        const d = new Date(dateVal);
        date = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
        time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      }
      venueName    = get(heroData, find(['venue', 'name'])?.key ?? '');
      venueAddress = get(heroData, find(['address', 'location'])?.key ?? '');
    } else {
      const dateVal = get(heroData, 'date') || get(heroData, 'wedding_date');
      const timeVal = get(heroData, 'time') || get(heroData, 'wedding_time');
      if (dateVal) {
        const d = new Date(dateVal);
        date = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
        if (!timeVal) time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      }
      if (timeVal) {
        const t = new Date(`1970-01-01T${timeVal}`);
        time = isNaN(t.getTime()) ? timeVal : t.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      }
      venueName    = get(heroData, 'venue_name') || get(heroData, 'venue');
      venueAddress = get(heroData, 'location')   || get(heroData, 'address') || get(heroData, 'wedding_location');
    }
  }

  // fallback from first event
  if (!date && Array.isArray(eventData) && eventData.length > 0) {
    const raw = eventData[0]?.date_time || eventData[0]?.start_time || '';
    if (raw) {
      const d = new Date(raw);
      date = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
      time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }
  }

  const dressCode = dressData?.dress_code || dressData?.code || 'Garden Party Chic';

  const displayDate    = date        || 'Saturday, June 14th, 2026';
  const displayTime    = time        || '2:00 PM – 5:00 PM';
  const displayVenue   = venueName   || 'The Garden House';
  const displayAddress = venueAddress|| 'Irrigation Park';

  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(displayAddress)}&output=embed`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-lg mx-auto bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50 relative overflow-hidden"
    >
      <BotanicalBranch className="absolute top-0 left-0 w-24 h-32 opacity-40 transform -scale-x-100" />
      <BotanicalBranch className="absolute bottom-0 right-0 w-24 h-32 opacity-40 transform rotate-180" />

      <button onClick={onBack} className="flex items-center gap-2 text-[var(--mauve)] hover:text-[var(--text-dark)] transition-colors mb-6 relative z-10">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        <span className="text-lg">Back</span>
      </button>

      <div className="text-center relative z-10">
        <h2 className="text-5xl text-[var(--gold-dark)] mb-8">When & Where</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl text-[var(--text-dark)] mb-2 border-b border-[var(--blush)] pb-2 inline-block">The Date & Time</h3>
            <p className="text-xl mt-3">{displayDate}</p>
            <p className="text-xl">{displayTime}</p>
          </div>

          <div>
            <h3 className="text-2xl text-[var(--text-dark)] mb-2 border-b border-[var(--blush)] pb-2 inline-block">The Venue</h3>
            <p className="text-xl mt-3 font-semibold">{displayVenue}</p>
            <p className="text-lg italic text-[var(--text-main)]">{displayAddress}</p>
            <div className="mt-4 w-full h-40 rounded-xl overflow-hidden border border-[var(--sage)]">
              <iframe src={mapUrl} width="100%" height="160" style={{ border: 0 }} allowFullScreen loading="lazy" title="Venue Map" />
            </div>
          </div>

          <div>
            <h3 className="text-2xl text-[var(--text-dark)] mb-2 border-b border-[var(--blush)] pb-2 inline-block">Details</h3>
            <p className="text-lg mt-3"><span className="font-semibold">Dress Code:</span> {dressCode}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
