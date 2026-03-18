'use client';

import { PreviewProvider, usePreview } from "@/core/context/PreviewContext";
import { useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import { identifyIdType, IdType } from '@/core/assets/utils';


// marriage
import MarriageTemplate1 from "@/core/template/marriage/template-1";
import MarriageTemplate2 from "@/core/template/marriage/template-2";
import MarriageTemplate3 from "@/core/template/marriage/template-3";
import MarriageTemplate4 from "@/core/template/marriage/template-4";
import BirthdayT1 from "@/core/template/birthday/template-1";
import HoliTemolateT1 from '@/core/template/holi/template-1'
import HoliTemolateT2 from '@/core/template/holi/template-2'
import BirthdayWisht1 from '@/core/template/birthday-wish/template-1'
import MarriageTemplate5 from "@/core/template/marriage/template-5";

const TEMPLATE_MAP: Record<string, Record<string, React.ComponentType>> = {
  Wedding: {
    "classic wedding": MarriageTemplate1,
    "modern wedding": MarriageTemplate2,
    "culture wedding": MarriageTemplate3,
    "botanical garden": MarriageTemplate4,
    "legante":MarriageTemplate5
  },
  Birthday: {
    "birthday celebration": BirthdayT1
  },
  holi:{
    "splash & play":HoliTemolateT1,
    "retro bollywood":  HoliTemolateT2,
  },
  birthday_wish:{
    "surprise birthday card":
    BirthdayWisht1
  }
};  




function TemplateContent() {
  const params = useParams();
  const pathname = usePathname();
  
  const resolvedParams = params as Record<string, unknown>;
  
  // Use common method to identify ID type
  const pathParts = pathname.split('/').filter(Boolean);
  const firstSegment = pathParts[0];
  const idType: IdType = firstSegment ? identifyIdType(firstSegment) : 'unknown';
  
  let category: string | undefined;
  let templateName: string | undefined;
  let id: string | undefined;
  
  if (idType === 'rsvp') {
    // RSVP token: starts with "rsvp_" and length is 15
    id = firstSegment;
  } else if (idType === 'public') {
    // Public ID: starts with "pub_" and length is 16
    id = firstSegment;
  } else if (firstSegment === 'invitation_id') {
    // /invitation/[id]/[category]/[templateName]
    category = Array.isArray(resolvedParams.category) 
      ? resolvedParams.category[0] 
      : resolvedParams.category as string;
    templateName = Array.isArray(resolvedParams.templateName) 
      ? resolvedParams.templateName[0] 
      : resolvedParams.templateName as string;
    id = Array.isArray(resolvedParams.id) 
      ? resolvedParams.id[0] 
      : resolvedParams.id as string;
  } else if (firstSegment === 'preview') {
    // /preview/[...slug] - slug might contain category/templateName
    const slug = resolvedParams.slug;
    if (Array.isArray(slug)) {
      category = slug[0];
      templateName = slug[1];
    } else if (typeof slug === 'string') {
      // Could be "category/templateName" format
      const slugParts = slug.split('/');
      category = slugParts[0];
      templateName = slugParts[1];
    }
  } else {
    // Treat as slug/invitation ID
    id = firstSegment;
  }
  
  const { previewData, isLoading } = usePreview();
  const invitation = previewData;
  const urlTemplateName = templateName?.replace(/_/g, " ");
  
  // Helper function to extract string value from either direct string or SectionResponse
  const extractString = (value: unknown): string => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value !== null && 'data' in value && typeof (value as Record<string, unknown>).data === 'string') {
      return (value as { data: string }).data;
    }
    return '';
  };

  // Update metadata when previewData changes
  useEffect(() => {
    if (invitation) {
      console.log('[TemplateRenderer] invitation data:', invitation);
      console.log('[TemplateRenderer] invitation_title:', invitation.invitation_title);
      
      const title = extractString(invitation.invitation_title) || 'You are Invited!';
      const description = extractString(invitation.invitation_message) || extractString(invitation.invitation_tag_line) || 'Join us for a special celebration.';
      console.log('[TemplateRenderer] extracted title:', title);
      console.log('[TemplateRenderer] extracted description:', description);

    }
  }, [invitation]);
  

  const finalCategory = category || invitation?.template_type?.replace(/ /g, "_");
  const finalTemplateName = urlTemplateName || invitation?.template_name;
  
  console.log('Category:', finalCategory, 'Template Name:', finalTemplateName);

  // Normalize for lookup (case-insensitive keys in map would be better, but let's match existing structure)
  // The map has "Wedding" and "Birthday" (Title Case)
  // URL params might come in as "wedding" or "birthday" (lowercase)
  const categoryKey = Object.keys(TEMPLATE_MAP).find(
    k => k.toLowerCase() === finalCategory?.toLowerCase()
  ) || finalCategory || "";

  const templateKey = finalTemplateName || "";
  
  // Find template in the matching category (case-insensitive lookup for template name too)
  const categoryTemplates = TEMPLATE_MAP[categoryKey] || {};
  const foundTemplateKey = Object.keys(categoryTemplates).find(
    k => k.toLowerCase() === templateKey.toLowerCase()
  ) || templateKey;

  const Template = categoryTemplates[foundTemplateKey];
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        {/* <div className="w-10 h-10 border-4 border-stone-300 border-t-stone-200 rounded-full animate-spin" /> */}
        <div className="text-stone-500">Loading Template...</div>
      </div>
    );
  }

  if (!Template) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-4 text-center">
        <h2 className="text-3xl font-[Caveat] text-stone-700 font-bold mb-4">Template Not Found</h2>
        <div className="text-stone-500 space-y-2">
          <p>Category: <span className="font-mono text-stone-800">{categoryKey || finalCategory}</span></p>
          <p>Template Name: <span className="font-mono text-stone-800">{foundTemplateKey || templateKey}</span></p>
          <p>ID Type: <span className="font-mono text-stone-800">{idType}</span></p>
        </div>
      </div>
    );
  }
  
  return <Template />;
}

export default function TemplateRenderer() {
  const params = useParams();
  const pathname = usePathname();
  const pathParts = pathname.split('/').filter(Boolean);
  console.log("hello....?????")
  const firstSegment = pathParts[0];
  
  // Use common method to identify ID type
  const idType: IdType = firstSegment ? identifyIdType(firstSegment) : 'unknown';
  console.log("Hello......",firstSegment)
  const resolvedParams = params as Record<string, unknown>;
  
  // Get ID based on route type
  let actualId: string | undefined;
  
  if (idType === 'rsvp') {
    // RSVP token: starts with "rsvp_" and length is 15
    actualId = firstSegment;
  } else if (idType === 'public') {
    // Public ID: starts with "pub_" and length is 16
    actualId = firstSegment;
  } else if (firstSegment === 'invitation') {
    actualId = Array.isArray(resolvedParams.id) 
      ? resolvedParams.id[0] 
      : resolvedParams.id as string;
  } else if (firstSegment === 'public') {
    actualId = Array.isArray(resolvedParams.id) 
      ? resolvedParams.id[0] 
      : resolvedParams.id as string;
  } else if (firstSegment === 'rsvp') {
    actualId = Array.isArray(resolvedParams.rsvp_id)
      ? resolvedParams.rsvp_id[0]
      : resolvedParams.rsvp_id as string;
  } else if (firstSegment && firstSegment !== 'preview') {
    // Treat as slug/invitation ID
    actualId = firstSegment;
  }
  
  console.log('TemplateRenderer - ID:', actualId, 'Type:', idType);
  
  // Allow RSVP and Public routes without strict ID validation
  if (!actualId && firstSegment !== 'preview') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-4 text-center">
        <h2 className="text-3xl font-[Caveat] text-stone-700 font-bold mb-4">Invalid URL</h2>
        <p className="text-stone-500">No ID provided</p>
      </div>
    );
  }
  
  return (
    <PreviewProvider theme="default">
      <TemplateContent />
    </PreviewProvider>
  );
}
