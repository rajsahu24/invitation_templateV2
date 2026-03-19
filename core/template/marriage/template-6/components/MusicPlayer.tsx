import { useEffect, useRef, useState } from 'react';

const MUSIC_URL = 'https://res.cloudinary.com/dwbed0m72/video/upload/v1773927514/starostin-wedding-wedding-music-345462_hpekpq.mp3';

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const handleFirstClick = () => {
      if (started) return;
      setStarted(true);
      audioRef.current?.play();
      setPlaying(true);
    };
    document.addEventListener('click', handleFirstClick, { once: true });
    return () => document.removeEventListener('click', handleFirstClick);
  }, [started]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
      setStarted(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_URL} loop preload="auto" />

      <button
        onClick={toggle}
        className="fixed bottom-6 right-5 z-50 flex items-center justify-center rounded-full shadow-lg transition-all duration-300"
        style={{
          width: '44px',
          height: '44px',
          background: 'hsl(var(--background))',
          border: '1px solid hsl(var(--border))',
          cursor: 'pointer',
        }}
        aria-label={playing ? 'Mute music' : 'Play music'}
      >
        {playing ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#C4A265" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#C4A265" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#C4A265" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#C4A265" />
            <line x1="23" y1="9" x2="17" y2="15" stroke="#C4A265" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="17" y1="9" x2="23" y2="15" stroke="#C4A265" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </>
  );
}
