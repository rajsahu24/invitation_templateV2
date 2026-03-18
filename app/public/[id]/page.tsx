import TemplateRenderer from '@/core/pages/TemplateRenderer';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PublicPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  console.log('Public page id:', id);
  
  return <TemplateRenderer />;
}
