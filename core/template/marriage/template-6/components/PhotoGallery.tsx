'use client';
import { useEffect, useState } from 'react';
import { usePreview } from '../../../../context/PreviewContext';

const DUMMY_IMAGES = [
  { image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80' },
  { image_url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80' },
  { image_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80' },
  { image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80' },
  { image_url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80' },
  { image_url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80' },
];

export function PhotoGallery() {
  const { previewData } = usePreview();
  const images = (previewData as any)?.image_section?.data?.images || [];
  const displayImages: { image_url: string }[] =
    Array.isArray(images) && images.length > 0 ? images : DUMMY_IMAGES;

  const total = displayImages.length;
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection('right');
      setAnimating(true);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % total);
        setAnimating(false);
      }, 400);
    }, 1500);
    return () => clearInterval(timer);
  }, [total]);

  const prev = (current - 1 + total) % total;
  const next = (current + 1) % total;

  // slide offset during animation
  const offset = animating ? (direction === 'right' ? '-8px' : '8px') : '0px';

  return (
    <section
      className="w-full py-14 overflow-hidden"
      style={{ background: 'hsl(var(--background))' }}
    >
      {/* heading */}
      <div className="flex flex-col items-center gap-2 mb-10 text-center px-4">
        <p
          className="uppercase tracking-[0.3em] text-[11px]"
          style={{ fontFamily: 'var(--font-body)', color: 'hsl(var(--muted-foreground))' }}
        >
          Captured Moments
        </p>
        <h2
          className="text-3xl md:text-4xl"
          style={{ fontFamily: 'var(--font-script)', color: 'hsl(var(--foreground))' }}
        >
          Our Gallery
        </h2>
        <div className="flex items-center gap-3 mt-1 w-48">
          <div className="flex-1 h-px" style={{ background: 'hsl(var(--border))' }} />
          <span style={{ color: 'hsl(var(--accent))', fontSize: 10 }}>◆</span>
          <div className="flex-1 h-px" style={{ background: 'hsl(var(--border))' }} />
        </div>
      </div>

      {/* slider */}
      <div className="relative flex items-center justify-center" style={{ height: '420px' }}>

        {/* LEFT — 25% visible */}
        <div
          className="absolute rounded-xl overflow-hidden"
          style={{
            width: '52%',
            height: '340px',
            left: '-14%',
            zIndex: 1,
            opacity: animating ? 0.15 : 0.35,
            transform: `scale(0.88) translateX(${offset})`,
            transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
            filter: 'brightness(0.7)',
          }}
        >
          <img
            src={displayImages[prev].image_url}
            alt="prev"
            className="w-full h-full object-cover"
          />
        </div>

        {/* CENTER — full */}
        <div
          className="absolute rounded-xl overflow-hidden"
          style={{
            width: '62%',
            height: '400px',
            zIndex: 10,
            transform: `scale(1) translateX(${animating ? (direction === 'right' ? '-6px' : '6px') : '0px'})`,
            transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
            border: '2px solid hsl(var(--border))',
            opacity: animating ? 0.85 : 1,
          }}
        >
          <img
            src={displayImages[current].image_url}
            alt="current"
            className="w-full h-full object-cover"
            style={{
              transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
              transform: animating ? 'scale(1.04)' : 'scale(1)',
            }}
          />
          {/* accent border glow */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{ boxShadow: 'inset 0 0 0 1px hsl(var(--accent) / 0.3)' }}
          />
        </div>

        {/* RIGHT — 25% visible */}
        <div
          className="absolute rounded-xl overflow-hidden"
          style={{
            width: '52%',
            height: '340px',
            right: '-14%',
            zIndex: 1,
            opacity: animating ? 0.15 : 0.35,
            transform: `scale(0.88) translateX(${animating ? '8px' : '0px'})`,
            transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
            filter: 'brightness(0.7)',
          }}
        >
          <img
            src={displayImages[next].image_url}
            alt="next"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* dots */}
      <div className="flex justify-center gap-2 mt-8">
        {displayImages.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 'right' : 'left'); setCurrent(i); }}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? '20px' : '6px',
              height: '6px',
              background: i === current ? 'hsl(var(--accent))' : 'hsl(var(--border))',
            }}
          />
        ))}
      </div>
    </section>
  );
}
