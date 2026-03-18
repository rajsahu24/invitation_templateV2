/**
 * Common utility function to identify the type of ID from URL
 * 
 * ID Patterns:
 * - RSVP token: starts with "rsvp_" and length is 15
 * - Public ID: starts with "pub_" and length is 16
 * - Other: treated as slug/invitation ID
 */

export type IdType = 'rsvp' | 'public' | 'slug' | 'invitation_id' | 'preview' | 'unknown';

/**
 * Identify the type of ID based on its prefix and length
 */
export function identifyIdType(id: string): IdType {
  if (!id) return 'unknown';
  const uuidRegex =/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  // RSVP token: starts with "rsvp_" and length is 15 (rsvp_ + 10 chars = 15)
  if(uuidRegex.test(id)){
    return 'invitation_id'
  }else if (id.startsWith('rsvp_') && id.length === 15) {
    return 'rsvp';
  }else if (id.startsWith('pub_') && id.length === 16) {
    return 'public';
  } 
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

  // /public/{pub_id}
  if (firstSegment === 'public' && pathParts[1]) {
    return { id: pathParts[1], type: 'public' };
  }

  // /preview/{category}/{template_name}/demo
  if (firstSegment === 'preview' && pathParts[1] && pathParts[2]) {
    return { id: `${pathParts[1]}/${pathParts[2]}`, type: 'preview' };
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
