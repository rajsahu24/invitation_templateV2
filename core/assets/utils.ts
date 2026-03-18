/**
 * Common utility function to identify the type of ID from URL
 * 
 * ID Patterns:
 * - RSVP token: starts with "rsvp_" and length is 15
 * - Public ID: starts with "pub_" and length is 16
 * - Other: treated as slug/invitation ID
 */

export type IdType = 'rsvp' | 'public' | 'slug' | 'unknown';

/**
 * Identify the type of ID based on its prefix and length
 */
export function identifyIdType(id: string): IdType {
  if (!id) return 'unknown';
  
  // RSVP token: starts with "rsvp_" and length is 15 (rsvp_ + 10 chars = 15)
  if (id.startsWith('rsvp_') && id.length === 15) {
    return 'rsvp';
  }
  
  // Public ID: starts with "pub_" and length is 16 (pub_ + 12 chars = 16)
  if (id.startsWith('pub_') && id.length === 16) {
    return 'public';
  }
  
  // Default: treated as slug/invitation ID
  return 'slug';
}

/**
 * Extract ID type and value from URL path
 */
export function getIdFromPath(pathname: string): { id: string | null; type: IdType } {
  if (!pathname) {
    return { id: null, type: 'unknown' };
  }

  const pathParts = pathname.split('/').filter(Boolean);
  const firstSegment = pathParts[0];

  if (!firstSegment) {
    return { id: null, type: 'unknown' };
  }

  const type = identifyIdType(firstSegment);
  return { id: firstSegment, type };
}

/**
 * Default invitation data when API is not available
 */
export const DEFAULT_INVITATION_DATA = {
  invitation_id: '',
  invitation_title: 'You are Invited!',
  invitation_message: 'Join us for a special celebration',
  invitation_tag_line: 'We would be honored to have you join us',
  template_type: 'Wedding',
  template_name: 'classic wedding',
  couple_name: '',
  event_date: '',
  event_time: '',
  event_venue: '',
  venue_address: '',
  groom_name: '',
  bride_name: '',
  events: [],
  gallery: [],
  rsvp: []
};
