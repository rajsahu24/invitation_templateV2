import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HeroSection } from './HeroSection';
import { NavigationCards } from './NavigationCards';
import { EventSection } from './EventSection';
import { GallerySection } from './GallerySection';
import { RSVPSection } from './RSVPSection';
import { MusicPlayer } from './MusicPlayer';
import { IntroVideo } from './IntroVideo';

const AUDIO_URL = 'https://res.cloudinary.com/dwbed0m72/video/upload/v1774095377/audioblocks-growing-up_SUYs-rTGT_NWM_v2g7gk.mp3';

type SectionType = 'event' | 'gallery' | 'rsvp' | null;

// Curtain panel — slides up to reveal
function CurtainPanel({ delay, color }: { delay: number; color: string }) {
  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-40 origin-bottom"
      style={{ background: color }}
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.76, 0, 0.24, 1] }}
    />
  );
}

export function BabyShowerApp() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showCurtain, setShowCurtain] = useState(false);
  const [showTemplate, setShowTemplate] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionType>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startMusic = () => {
    audioRef.current?.play().catch(() => {});
  };

  const handleIntroComplete = () => {
    startMusic();
    setShowCurtain(true);
    // Show template content slightly after curtain starts
    setTimeout(() => setShowTemplate(true), 200);
    // Mark intro fully done after curtain finishes
    setTimeout(() => { setIntroComplete(true); setShowCurtain(false); }, 1400);
  };

  const handleNavigate = (section: SectionType) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <audio ref={audioRef} src={AUDIO_URL} loop preload="auto" />

      {/* Intro video — shown until complete */}
      <AnimatePresence>
        {!introComplete && !showCurtain && (
          <IntroVideo onComplete={handleIntroComplete} onFirstClick={startMusic} />
        )}
      </AnimatePresence>

      {/* Curtain reveal layers */}
      <AnimatePresence>
        {showCurtain && (
          <>
            <CurtainPanel delay={0}    color="#F8E8E0" />
            <CurtainPanel delay={0.08} color="#E8DCF0" />
            <CurtainPanel delay={0.16} color="#FDF8F0" />
          </>
        )}
      </AnimatePresence>

      {/* Template — blooms in after curtain */}
      <AnimatePresence>
        {showTemplate && (
          <motion.div
            key="template"
            initial={{ opacity: 0, scale: 1.06, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen w-full relative overflow-x-hidden bg-gradient-to-b from-[var(--cream-warm)] to-[var(--blush-light)]/30"
          >
            {/* Background texture */}
            <div
              className="fixed inset-0 pointer-events-none opacity-40 mix-blend-multiply"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
              }}
            />

            <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center relative z-10">
              <AnimatePresence mode="wait">
                {activeSection === null ? (
                  <motion.div
                    key="landing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="w-full flex flex-col items-center"
                  >
                    <HeroSection />
                    <NavigationCards onNavigate={handleNavigate} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="section"
                    className="w-full flex-1 flex items-center justify-center py-12"
                  >
                    {activeSection === 'event'   && <EventSection   onBack={() => handleNavigate(null)} />}
                    {activeSection === 'gallery' && <GallerySection onBack={() => handleNavigate(null)} />}
                    {activeSection === 'rsvp'    && <RSVPSection    onBack={() => handleNavigate(null)} />}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <MusicPlayer audioRef={audioRef} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
