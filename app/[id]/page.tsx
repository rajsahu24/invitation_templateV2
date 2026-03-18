import TemplateRenderer from '@/core/pages/TemplateRenderer';

interface PageProps {
  params: Promise<{
    rsvp_id: string;
  }>;
}

export default async function RSVPPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { rsvp_id } = resolvedParams;
  
  console.log('RSVP page - rsvp_id:', rsvp_id);
  
  return <TemplateRenderer />;
}
