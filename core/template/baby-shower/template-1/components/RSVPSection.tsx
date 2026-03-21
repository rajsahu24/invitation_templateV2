import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartIcon } from './Illustrations';
import { usePreview } from '../../../../context/PreviewContext';
import type { InvitationData } from '../../../../hooks/getTemplateDataModel';

interface SectionProps { onBack: () => void; }

export function RSVPSection({ onBack }: SectionProps) {
  const { previewData } = usePreview() as { previewData: InvitationData };
  const invitation_id = previewData?.invitation_id;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', attendance: 'accept', guests: '1', message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          invitation_id,
          status: formData.attendance === 'accept' ? '2' : '4',
        }),
      });
      if (res.ok) setIsSubmitted(true);
    } catch (_) {
      setIsSubmitted(true); // still show thank you on error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-lg mx-auto bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/80"
    >
      <button onClick={onBack} className="flex items-center gap-2 text-[var(--mauve)] hover:text-[var(--text-dark)] transition-colors mb-6">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        <span className="text-lg">Back</span>
      </button>

      {isSubmitted ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
          <HeartIcon className="w-16 h-16 mx-auto mb-6" color="var(--blush-dark)" />
          <h2 className="text-4xl text-[var(--gold-dark)] mb-4">Thank You!</h2>
          <p className="text-xl text-[var(--text-dark)]">
            {formData.attendance === 'accept' ? "We can't wait to celebrate with you!" : 'You will be missed, thank you for letting us know.'}
          </p>
        </motion.div>
      ) : (
        <>
          <div className="text-center mb-8">
            <h2 className="text-5xl text-[var(--gold-dark)]">RSVP</h2>
            <p className="text-lg text-[var(--text-main)] italic mt-2">Kindly reply by the date mentioned</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { id: 'name',  label: 'Full Name',      type: 'text',  placeholder: 'Jane Doe' },
              { id: 'email', label: 'Email Address',  type: 'email', placeholder: 'jane@example.com' },
              { id: 'phone', label: 'Phone (Optional)',type: 'tel',   placeholder: '+1 234 567 8900' },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-lg text-[var(--text-dark)] mb-1">{label}</label>
                <input type={type} id={id} name={id} required={id !== 'phone'}
                  value={(formData as any)[id]} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--blush)] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--lavender)] transition-all text-lg"
                  placeholder={placeholder} />
              </div>
            ))}

            <div className="pt-2">
              <label className="block text-lg text-[var(--text-dark)] mb-2">Will you attend?</label>
              <div className="flex flex-col sm:flex-row gap-4">
                {[{ val: 'accept', label: 'Joyfully Accept' }, { val: 'decline', label: 'Regretfully Decline' }].map(({ val, label }) => (
                  <label key={val} className="flex-1 cursor-pointer">
                    <input type="radio" name="attendance" value={val} checked={formData.attendance === val} onChange={handleChange} className="peer sr-only" />
                    <div className="text-center px-4 py-3 rounded-xl border border-[var(--blush)] peer-checked:bg-[var(--blush-light)] peer-checked:border-[var(--blush-dark)] peer-checked:text-[var(--text-dark)] text-[var(--text-main)] transition-all text-lg">
                      {label}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <label htmlFor="message" className="block text-lg text-[var(--text-dark)] mb-1">Message (Optional)</label>
              <textarea id="message" name="message" rows={3} value={formData.message} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[var(--blush)] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--lavender)] transition-all text-lg resize-none"
                placeholder="Can't wait!" />
            </div>

            <button type="submit" disabled={isSubmitting}
              className="w-full mt-4 bg-[var(--mauve)] hover:bg-[var(--text-dark)] text-white text-xl py-4 rounded-xl transition-colors shadow-md disabled:opacity-50">
              {isSubmitting ? 'Sending…' : 'Send RSVP'}
            </button>
          </form>
        </>
      )}
    </motion.div>
  );
}
