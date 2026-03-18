'use client';

import { useParams, usePathname } from 'next/navigation';
import { identifyIdType, IdType } from '@/core/assets/utils';

/**
 * Hook to get the invitation ID from the current route
 * Uses common identifyIdType function to determine ID type
 * 
 * ID Patterns:
 * - RSVP token: starts with "rsvp_" and length is 15
 * - Public ID: starts with "pub_" and length is 16
 * - Other: treated as slug/invitation ID
 */
export function useInvitationId() {
  const params = useParams();
  const pathname = usePathname();
  
  const resolvedParams = params as Record<string, unknown>;
  const pathParts = pathname.split('/').filter(Boolean);
  console.log("Hello.......???",pathParts.length)
  const firstSegment = pathParts[0];
  
  // Use common method to identify ID type
  const idType: IdType = firstSegment ? identifyIdType(firstSegment) : 'unknown';
  
  let invitationId: string | null = null;
  let isRSVP = false;
  let isPublic = false;
  
  if (idType === 'rsvp') {
    // RSVP token: starts with "rsvp_" and length is 15
    invitationId = firstSegment;
    isRSVP = true;
  } else if (idType === 'public') {
    // Public ID: starts with "pub_" and length is 16
    invitationId = firstSegment;
    isPublic = true;
  } else if (idType === 'slug') {
    // Could be invitation ID or preview slug
    // Check for explicit route prefixes
    if (firstSegment === '') {
      const id = Array.isArray(resolvedParams.id) 
        ? resolvedParams.id[0] 
        : resolvedParams.id;
      invitationId = id as string;
    } else if (firstSegment === 'preview') {
      // Preview mode - no invitation ID
      invitationId = null;
    } else {
      // Treat as slug/invitation ID
      invitationId = firstSegment;
    }
  }
  
  return { invitationId, isRSVP, isPublic, idType };
}
