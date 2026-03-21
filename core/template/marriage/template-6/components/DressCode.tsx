import { motion } from 'framer-motion';
import { usePreview } from '../../../../context/PreviewContext';

const BG = 'https://res.cloudinary.com/dwbed0m72/image/upload/v1773927073/can_you_enhance_this_image_because_i_want_to_use_this_image_as_a_background_image_and_fort_should_be_in_golden_color_gjaea4.jpg';

export function DressCode() {
  const { previewData } = usePreview();
  const data = (previewData as any)?.dress_code_section?.data;
console.log(previewData, "previewData")
  const women = data?.women || data?.woman_dress_code || 'Cocktail or formal dress';
  const men   = data?.men   || data?.man_dress_code
   || 'Dark suit and tie';

  const script: React.CSSProperties = {
    fontFamily: 'var(--font-script)',
    color: '#C4A265',
  };

  const body: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    color: 'hsl(var(--foreground))',
  };

  return (
    <section
      className="relative w-full flex items-center justify-center py-16 px-5 overflow-hidden"
      style={{ minHeight: '480px' }}
    >
      {/* background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${BG}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.75)',
        }}
      />

      {/* frosted glass card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-xs rounded-3xl px-10 py-12 text-center"
        style={{
          background: 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(196,162,101,0.25)',
        }}
      >
        {/* title */}
        <motion.h2
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-8"
          style={{ ...script, fontSize: 'clamp(2rem, 7vw, 2.6rem)' }}
        >
          Dress Code
        </motion.h2>

        {/* Women */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mb-2"
          style={{ ...script, fontSize: 'clamp(1.5rem, 5vw, 2rem)' }}
        >
          Women
        </motion.h3>
        <p
          className="mb-8 text-sm italic tracking-wide"
          style={{ ...body, color: 'hsl(var(--muted-foreground))' }}
        >
          {women}
        </p>

        {/* divider */}
        <div
          className="w-16 h-px mx-auto mb-8"
          style={{ background: 'hsl(var(--border))' }}
        />

        {/* Men */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mb-2"
          style={{ ...script, fontSize: 'clamp(1.5rem, 5vw, 2rem)' }}
        >
          Men
        </motion.h3>
        <p
          className="text-sm italic tracking-wide"
          style={{ ...body, color: 'hsl(var(--muted-foreground))' }}
        >
          {men}
        </p>
      </motion.div>
    </section>
  );
}
