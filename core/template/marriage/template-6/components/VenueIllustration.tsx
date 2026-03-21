import { motion } from 'framer-motion';
import { usePreview } from '../../../../context/PreviewContext';

const ILLUSTRATION = 'https://res.cloudinary.com/dwbed0m72/image/upload/v1773924895/Untitled_design_1_qw0zd1.png';

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export function VenueIllustration() {
  const { previewData } = usePreview();
  const heroSection = previewData?.location_section;
  const data = heroSection?.data;
  const schema = heroSection?.schema;

  const get = (key: string) => (data && typeof data === 'object' ? (data as any)[key] : '') || '';

  let venueName = '', venueAddress = '', venueCity = '', weddingDate = '';

  if (data && typeof data === 'object') {
    if (schema?.fields) {
      const find = (kws: string[]) =>
        schema.fields.find((f: any) => kws.some((k: string) => f.key.toLowerCase().includes(k)));
      venueName    = get(find(['venue', 'name'])?.key ?? '');
      venueAddress = get(find(['address'])?.key ?? '');
      venueCity    = get(find(['city'])?.key ?? '');
      const dateVal = get(find(['date'])?.key ?? '');
      weddingDate  = dateVal ? formatDate(dateVal) : '';
    } else {
      venueName    = get('venue_name') || get('venue');
      venueAddress = get('location') || get('address') || get('wedding_location');
      venueCity    = get('city') || get('venue_city');
      const dateVal = get('date') || get('wedding_date');
      weddingDate  = dateVal ? formatDate(dateVal) : '';
    }
  }

  const displayVenueName    = venueName    || 'Villa Medicea di Artimino';
  const displayVenueAddress = venueAddress || 'Via di Papa Leone X, 28';
  const displayVenueCity    = venueCity    || 'Artimino, Florencia';
  const displayDate         = weddingDate  || 'September 10, 2027';

  return (
    <section
      className="w-full py-14 px-6 flex flex-col items-center text-center"
      style={{ backgroundColor: '#F5F0E8' }}
    >
      {/* top label */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          color: '#7A5C3A',
          fontWeight: 700,
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
        }}
      >
        The Celebration Will Take Place At
      </motion.p>

      {/* venue illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="w-full max-w-xs mb-8"
      >
        <img
          src={ILLUSTRATION}
          alt={displayVenueName}
          className="w-full object-contain"
        />
      </motion.div>

      {/* venue name */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.6rem, 6vw, 2.2rem)',
          color: '#5C3A1E',
          fontWeight: 400,
          marginBottom: '0.75rem',
        }}
      >
        {displayVenueName}
      </motion.p>

      {/* address */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-6"
      >
        <p style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '0.65rem',
          letterSpacing: '0.18em',
          color: '#7A5C3A',
          fontWeight: 600,
          textTransform: 'uppercase',
          lineHeight: 1.8,
        }}>
          {displayVenueAddress}<br />{displayVenueCity}
        </p>
      </motion.div>

      {/* divider */}
      <div className="w-16 h-px mb-6" style={{ backgroundColor: '#C4A882' }} />

      {/* date */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.3rem, 5vw, 1.7rem)',
          color: '#C4A265',
          fontStyle: 'italic',
          fontWeight: 600,
          marginBottom: '1.5rem',
        }}
      >
        {displayDate}
      </motion.p>

      {/* divider */}
      <div className="w-16 h-px mb-6" style={{ backgroundColor: '#C4A882' }} />

      {/* reception label */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.4rem, 5vw, 1.8rem)',
          color: '#5C3A1E',
          fontWeight: 700,
        }}
      >
        Reception to Follow
      </motion.p>
    </section>
  );
}
