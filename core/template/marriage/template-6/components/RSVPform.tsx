'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Clock } from 'lucide-react';
import { usePreview } from '../../../../context/PreviewContext';

const OPTIONS = [
  { id: 2, label: 'Joyfully Accept', icon: Check,  accent: '#4a7c59' },
  { id: 3, label: 'Maybe',           icon: Clock,  accent: '#b8860b' },
  { id: 4, label: 'Regretfully Decline', icon: X,  accent: '#9b4444' },
];

function RSVPform() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { previewData } = usePreview();
  const guest_status = (previewData as any).guest || previewData;

  const getRSVPToken = () => window.location.pathname.split('/')[4] || null;
  const currentStatus = selectedOption ?? guest_status?.status;

  const handleSubmit = async (status: number) => {
    const token = getRSVPToken();
    if (!token) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/invitations/guest_rsvp/${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) { setSelectedOption(status); setIsSubmitted(true); }
    } catch (_) {}
    finally { setIsSubmitting(false); }
  };

  const alreadyResponded = isSubmitted || [2, 3, 4]?.includes(guest_status?.status);

  return (
    <section className="w-full py-14 px-6" style={{ background: 'hsl(var(--background))' }} id="rsvp">
      {/* heading */}
      <div className="flex flex-col items-center gap-2 mb-10 text-center">
        <h2 className="text-4xl md:text-5xl"
          style={{ fontFamily: 'var(--font-script)', color: 'hsl(var(--foreground))' }}>
          RSVP
        </h2>
        <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: 'hsl(var(--muted-foreground))' }}>
          We request the honour of your presence
        </p>
        <div className="flex items-center gap-3 mt-1 w-48">
          <div className="flex-1 h-px" style={{ background: 'hsl(var(--border))' }} />
          <span style={{ color: 'hsl(var(--accent))', fontSize: 10 }}>◆</span>
          <div className="flex-1 h-px" style={{ background: 'hsl(var(--border))' }} />
        </div>
      </div>

      <div className="max-w-sm mx-auto">
        {alreadyResponded ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl p-10 text-center"
            style={{ background: 'hsl(var(--secondary))', border: '1px solid hsl(var(--border))' }}
          >
            <p className="text-4xl mb-4">
              {currentStatus === 2 ? '🎉' : currentStatus === 3 ? '🤔' : '💌'}
            </p>
            <h3 className="text-2xl mb-2"
              style={{ fontFamily: 'var(--font-script)', color: 'hsl(var(--foreground))' }}>
              {currentStatus === 2 ? 'See you there!' : currentStatus === 3 ? "We'll keep a spot!" : "We'll miss you!"}
            </h3>
            <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: 'hsl(var(--muted-foreground))' }}>
              {currentStatus === 2
                ? 'Your RSVP has been recorded. We look forward to celebrating with you!'
                : currentStatus === 3
                ? "We've noted that you might attend. Please let us know if your plans change!"
                : "Thank you for letting us know. We're sorry you can't make it."}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl p-8 space-y-4"
            style={{ background: 'hsl(var(--secondary))', border: '1px solid hsl(var(--border))' }}
          >
            <p className="text-center text-sm mb-6"
              style={{ fontFamily: 'var(--font-body)', color: 'hsl(var(--muted-foreground))' }}>
              Please let us know if you'll be joining us
            </p>

            {OPTIONS.map(({ id, label, icon: Icon, accent }, i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSubmit(id)}
                disabled={isSubmitting}
                className="w-full flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-200 disabled:opacity-50"
                style={{
                  background: 'hsl(var(--background))',
                  border: `1px solid hsl(var(--border))`,
                  fontFamily: 'var(--font-body)',
                  color: 'hsl(var(--foreground))',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = accent)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'hsl(var(--border))')}
              >
                <Icon className="w-4 h-4 flex-shrink-0" style={{ color: accent }} />
                <span className="text-sm tracking-wide">{isSubmitting ? 'Submitting…' : label}</span>
              </motion.button>
            ))}

            <p className="text-center text-xs pt-2"
              style={{ fontFamily: 'var(--font-body)', color: 'hsl(var(--muted-foreground))' }}>
              Please respond by the date mentioned in the invitation
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default RSVPform;
