import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { usePreview } from '../../../../context/PreviewContext';

const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
};

export function HeroSection() {
  const { previewData } = usePreview();
  const heroSection = previewData?.hero_section;
  const data = heroSection?.data;
  const schema = heroSection?.schema;

  const getFieldValue = (key: string) => (data && typeof data === 'object' ? data[key] : '') || '';

  let brideName = '', groomName = '', weddingDate = '', tagLine = '';

  if (data && typeof data === 'object') {
    if (schema?.fields) {
      const findField = (keywords: string[]) =>
        schema.fields.find((f: any) => keywords.some(k => f.key.toLowerCase()?.includes(k)));
      brideName = getFieldValue(findField(['bride'])?.key ?? 'bride_name');
      groomName = getFieldValue(findField(['groom'])?.key ?? 'groom_name');
      const dateVal = getFieldValue(findField(['date'])?.key ?? 'date');
      weddingDate = dateVal ? formatDate(dateVal) : '';
      tagLine = getFieldValue(findField(['tag'])?.key ?? 'tag_line');
    } else {
      brideName = getFieldValue('bride_name');
      groomName = getFieldValue('groom_name');
      const dateVal = getFieldValue('date') || getFieldValue('wedding_date');
      weddingDate = dateVal ? formatDate(dateVal) : '';
      tagLine = getFieldValue('tag_line') || getFieldValue('invitation_tag_line');
    }
  }

  const displayGroomName = groomName || 'Alexander';
  const displayBrideName = brideName || 'Victoria';
  const displayWeddingDate = weddingDate || formatDate('2026-09-12');
  const displayTagLine = tagLine || "We're Getting Married";

  return (
    <section className="relative w-full overflow-hidden" style={{ aspectRatio: '9/16', minHeight: '100svh' }}>

      {/* Video — 9:16 full screen */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://res.cloudinary.com/dwbed0m72/video/upload/v1773838188/1000030967_wiultn.mp4" type="video/mp4" />
      </video>

      {/* Light overlay — just enough to make text pop without hiding video */}
      <div className="absolute inset-0 bg-black/30" />

      {/* TOP — tagline + names */}
      <div className="absolute top-20 left-0 right-0 z-10 flex flex-col items-center pt-10 px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="uppercase tracking-[0.3em] text-[11px] font-bold text-white mb-4"
          style={{ fontFamily: 'var(--font-body)', textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}
        >
          {displayTagLine}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="text-white leading-none"
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(3rem, 12vw, 5.5rem)',
            textShadow: '0 2px 12px rgba(0,0,0,0.5)',
          }}
        >
          {displayGroomName}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="text-white/80 my-1"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.6rem, 6vw, 2.5rem)',
            textShadow: '0 1px 8px rgba(0,0,0,0.5)',
          }}
        >
          &amp;
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="text-white leading-none"
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(3rem, 12vw, 5.5rem)',
            textShadow: '0 2px 12px rgba(0,0,0,0.5)',
          }}
        >
          {displayBrideName}
        </motion.p>
      </div>

      {/* BOTTOM — divider + date + RSVP + chevron */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center gap-3 px-4 text-center">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex items-center gap-3 w-44"
        >
          <div className="flex-1 h-px bg-white/60" />
          <span className="text-white/70 text-xs">◆</span>
          <div className="flex-1 h-px bg-white/60" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="text-white font-semibold tracking-wide"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.3rem, 5vw, 1.8rem)',
            textShadow: '0 2px 8px rgba(0,0,0,0.6)',
          }}
        >
          {displayWeddingDate}
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="uppercase tracking-[0.35em] text-[11px] text-white/85 border-b border-white/50 pb-0.5 hover:text-white transition-colors"
          style={{ fontFamily: 'var(--font-body)', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
          onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}
        >
          RSVP
        </motion.button>

        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5 text-white/60" />
        </motion.div>
      </div>
    </section>
  );
}
