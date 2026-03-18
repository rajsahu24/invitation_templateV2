import TemplateRenderer from '@/core/pages/TemplateRenderer';

interface PageProps {
  params: Promise<{
    id: string;
    category: string;
    templateName: string;
  }>;
}

export default async function InvitationPage({ params }: PageProps) {
  // Next.js 15+ requires awaiting params
  const resolvedParams = await params;
  console.log('Invitation page params:', resolvedParams);
  
  return <TemplateRenderer />;
}
