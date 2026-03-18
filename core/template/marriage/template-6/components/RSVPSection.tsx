'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePreview } from '../../../../context/PreviewContext';
import type { InvitationData } from '../../../../hooks/getTemplateDataModel';

export function RSVPSection() {
  const [formState, setFormState] = useState({ name: '', phone: '', email: '', status: '2', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { previewData } = usePreview() as { previewData: InvitationData };
  const invitation_id = previewData.invitation_id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formState, invitation_id }),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormState({ name: '', phone: '', email: '', status: '2', message: '' });
      }
    } catch (_) {}
    finally { setIsSubmitting(false); }
  };

  const inputStyle = {
    fontFamily: 'var(--font-body)',
    borderBottom: '1px solid hsl(var(--border))',
    background: 'transparent',
    color: 'hsl(var(--foreground))',
    outline: 'none',
    width: '100%',
    padding: '8px 0',
    fontSize: '14px',
  } as React.CSSProperties;

  const labelStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: 'hsl(var(--muted-foreground))',
  };

  return (
    <section className="w-full py-14 px-6" style={{ background: 'hsl(var(--background))' }} id="rsvp">
      {/* heading */}
      <div className="flex flex-col items-center gap-2 mb-10 text-center">
        <h2 className="text-4xl md:text-5xl"
          style={{ fontFamily: 'var(--font-script)', color: 'hsl(var(--foreground))' }}>
          RSVP
        </h2>
        <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: 'hsl(var(--muted-foreground))' }}>
          Kindly respond by filling the form below
        </p>
        <div className="flex items-center gap-3 mt-1 w-48">
          <div className="flex-1 h-px" style={{ background: 'hsl(var(--border))' }} />
          <span style={{ color: 'hsl(var(--accent))', fontSize: 10 }}>◆</span>
          <div className="flex-1 h-px" style={{ background: 'hsl(var(--border))' }} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-sm mx-auto rounded-2xl p-8"
        style={{ background: 'hsl(var(--secondary))', border: '1px solid hsl(var(--border))' }}
      >
        {submitted ? (
          <div className="text-center py-8">
            <p className="text-4xl mb-4">💌</p>
            <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-script)', color: 'hsl(var(--foreground))' }}>
              Thank You!
            </h3>
            <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: 'hsl(var(--muted-foreground))' }}>
              We look forward to celebrating with you.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label style={labelStyle}>Full Name</label>
              <input style={inputStyle} type="text" required placeholder="Your name"
                value={formState.name} onChange={e => setFormState({ ...formState, name: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label style={labelStyle}>Phone</label>
              <input style={inputStyle} type="tel" required placeholder="Your phone"
                value={formState.phone} onChange={e => setFormState({ ...formState, phone: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label style={labelStyle}>Email</label>
              <input style={inputStyle} type="email" required placeholder="Your email"
                value={formState.email} onChange={e => setFormState({ ...formState, email: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label style={labelStyle}>Will you attend?</label>
              <select style={inputStyle} value={formState.status}
                onChange={e => setFormState({ ...formState, status: e.target.value })}>
                <option value="2">Joyfully Accept</option>
                <option value="3">Maybe</option>
                <option value="4">Regretfully Decline</option>
              </select>
            </div>
            <div className="space-y-1">
              <label style={labelStyle}>Message (Optional)</label>
              <textarea style={{ ...inputStyle, resize: 'none' }} rows={3} placeholder="Leave a message"
                value={formState.message} onChange={e => setFormState({ ...formState, message: e.target.value })} />
            </div>
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-10 py-3 rounded-full text-xs uppercase tracking-[0.25em] transition-all duration-300 disabled:opacity-50"
                style={{
                  fontFamily: 'var(--font-body)',
                  background: 'hsl(var(--primary))',
                  color: 'hsl(var(--primary-foreground))',
                }}
              >
                {isSubmitting ? 'Sending…' : 'Send RSVP'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </section>
  );
}
