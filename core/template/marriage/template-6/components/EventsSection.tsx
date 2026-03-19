import { motion } from 'framer-motion';
import { usePreview } from '../../../../context/PreviewContext';
import type { InvitationData } from '../../../../hooks/getTemplateDataModel';

const formatTime = (dateTimeString: string) => {
  if (!dateTimeString) return '';
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

const DUMMY_EVENTS = [
  { event_name: 'Arrival & Welcome Drinks', date_time: '2026-09-12T17:00:00', tag_line: 'Reception and welcome cocktails at the villa' },
  { event_name: 'Ceremony',                 date_time: '2026-09-12T18:00:00', tag_line: 'The most special moment of the day' },
  { event_name: 'Cocktail Hour & Dinner',   date_time: '2026-09-12T19:30:00', tag_line: 'Al fresco dining under the stars' },
  { event_name: 'Party',                    date_time: '2026-09-12T21:00:00', tag_line: "Let's dance the night away!" },
  { event_name: 'Last Dance',               date_time: '2026-09-12T23:30:00', tag_line: 'Farewell and beautiful memories' },
];

export function EventsSection() {
  const { previewData } = usePreview() as { previewData: InvitationData };
  const eventSection = previewData?.event_section;
  const events = eventSection?.data || [];
  const schema = eventSection?.schema;
  const displayEvents = Array.isArray(events) && events.length > 0 ? events : DUMMY_EVENTS;

  const getTime = (event: any) => {
    if (schema?.fields) {
      const dateField = schema.fields.find((f: any) => ['datetime', 'date'].includes(f.type));
      return dateField ? formatTime(event[dateField.key]) : '';
    }
    const v = event.date_time || event.start_time || event.date;
    return v ? formatTime(v) : '';
  };

  const getTitle = (event: any) => {
    if (schema?.fields) {
      const f = schema.fields.find((f: any) =>
        f.key.toLowerCase().includes('name') || f.key.toLowerCase().includes('title'));
      return f ? event[f.key] : '';
    }
    return event.event_name || event.name || event.title || '';
  };

  const getDesc = (event: any) => {
    if (schema?.fields) {
      const f = schema.fields.find((f: any) =>
        f.key.toLowerCase().includes('location') || f.key.toLowerCase().includes('location'));
      return f ? event[f.key] : '';
    }
    return event.location || '';
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: 'hsl(var(--secondary))' }}
    >
      {/* heading */}
      <div className="pt-14 pb-6 flex flex-col items-center text-center px-4">
        <h2
          className="text-4xl md:text-5xl mb-2"
          style={{ fontFamily: 'var(--font-script)', color: 'hsl(var(--foreground))' }}
        >
          Our Wedding Day
        </h2>
        <p
          className="uppercase tracking-[0.25em] text-[11px]"
          style={{ fontFamily: 'var(--font-body)', color: 'hsl(var(--muted-foreground))' }}
        >
          What we have planned for you
        </p>
      </div>

      {/* timeline */}
      <div className="relative px-6 pb-0 max-w-sm mx-auto">
        {displayEvents.map((event: any, index: number) => {
          const time  = getTime(event);
          const title = getTitle(event);
          const desc  = getDesc(event);
          const isLast = index === displayEvents.length - 1;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* time */}
              {time && (
                <p
                  className="text-xs mb-1"
                  style={{ fontFamily: 'var(--font-body)', color: 'hsl(var(--muted-foreground))' }}
                >
                  {time}
                </p>
              )}

              {/* title */}
              <h3
                className="text-xl md:text-2xl font-semibold mb-1"
                style={{ fontFamily: 'var(--font-display)', color: 'hsl(var(--foreground))' }}
              >
                {title}
              </h3>

              {/* description */}
              {desc && (
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ fontFamily: 'var(--font-body)', color: 'hsl(var(--muted-foreground))' }}
                >
                  {desc}
                </p>
              )}

              {/* vertical line + dot connector */}
              {!isLast && (
                <div className="flex flex-col items-center mb-4">
                  <div className="w-px h-10" style={{ background: 'hsl(var(--border))' }} />
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: 'hsl(var(--primary))' }}
                  />
                  <div className="w-px h-10" style={{ background: 'hsl(var(--border))' }} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* bottom decorative illustration overlay */}
      <div
        className="w-full h-64 mt-4"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dwbed0m72/image/upload/v1773841977/XnZ8h-FBrgaM9JqowtpNqC-efFhPcPyfcW7bTKfPuQzlg_bZgPHxFMfMWgGChDlLSe9cwq8bcGn6Rc7ESo8XqliQDE_T8YqTOEysGSw6h2I_fnsepq.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          opacity: 0.25,
        }}
      />
    </section>
  );
}
