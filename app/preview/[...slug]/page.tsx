import TemplateRenderer from '@/core/pages/TemplateRenderer';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function PreviewPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  console.log('Preview page slugASDFASDFASDF:', slug);
  
  // The slug could contain category and template name
  // Example: ['wedding', 'classic-wedding'] or ['birthday', 'celebration']
  
  return <TemplateRenderer />;
}
