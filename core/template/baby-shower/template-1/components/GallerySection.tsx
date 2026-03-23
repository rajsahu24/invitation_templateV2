import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CameraIcon } from './Illustrations';
import { usePreview } from '../../../../context/PreviewContext';

interface SectionProps { onBack: () => void; }

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1, transition: { duration: 0.5 } } };

const defaultCaptions = ['Waiting for you', 'Nursery details', 'Baby bump', 'Family love', 'Tiny shoes', 'Sweet moments'];

export function GallerySection({ onBack }: SectionProps) {
  const { previewData } = usePreview();
  const [lightbox, setLightbox] = useState<string | null>(null);

  const galleryData = (previewData as any)?.image_section?.data?.images;
  console.log(galleryData)
  const rawImages: string[] = Array.isArray(galleryData)
    ? galleryData.map((item: any) => item?.image_url || item?.url || item?.src || '').filter(Boolean)
    : galleryData?.images || galleryData?.photos || [];

  const frames = (rawImages.length === 0 ? Array.from({ length: 6 }) : rawImages).map((img: any, i: number) => ({
    id: i,
    rotation: Math.random() * 6 - 3,
    caption: defaultCaptions[i] || '',
    image: rawImages.length === 0 ? null : img,
  }));

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-3xl mx-auto bg-white/40 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white/50">

        <button onClick={onBack} className="flex items-center gap-2 text-[var(--mauve)] hover:text-[var(--text-dark)] transition-colors mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          <span className="text-lg">Back</span>
        </button>

        <div className="text-center mb-8">
          <h2 className="text-5xl text-[var(--gold-dark)]">Precious Moments</h2>
          <p className="text-lg text-[var(--text-main)] italic mt-2">A glimpse into our journey</p>
        </div>

        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {frames.map((frame) => (
            <motion.div
              key={frame.id}
              variants={item}
              onClick={() => frame.image && setLightbox(frame.image)}
              className={`bg-white p-3 pb-8 rounded-sm shadow-md hover:shadow-xl transition-shadow duration-300 ${frame.image ? 'cursor-pointer' : ''}`}
              style={{ transform: `rotate(${frame.rotation}deg)` }}>
              <div className="w-full aspect-square bg-gradient-to-br from-[var(--blush-light)] to-[var(--lavender-light)] flex items-center justify-center mb-3 overflow-hidden">
                {frame.image
                  ? <img src={frame.image} alt={frame.caption} className="w-full h-full object-cover" />
                  : <CameraIcon className="w-8 h-8 opacity-30" color="var(--text-main)" />}
              </div>
              {/* <p className="text-center text-sm text-[var(--text-dark)] font-script text-xl">{frame.caption}</p> */}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <motion.img
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              src={lightbox} alt="Preview"
              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()} />
            <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white text-3xl leading-none">&times;</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}