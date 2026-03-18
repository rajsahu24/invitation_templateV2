import { EventsSection } from "./components/EventsSection";
import { HeroSection } from "./components/HeroSection";
import { PhotoGallery } from "./components/PhotoGallery";
import { RSVPSection } from "./components/RSVPSection";
import RSVPForm from "./components/RSVPform";

import "./index.css";
import { useInvitationId } from '@/core/hooks/useInvitationId';

function MarriageContent() {
  const { invitationId, isRSVP } = useInvitationId();
  
  return (
    <div className=""> 
      <div id="hero_section">
        <HeroSection />
      </div>
      <div id="event_section">
        <EventsSection />
      </div>
      <div id="image_section">
        <PhotoGallery />
      </div>
      {isRSVP ? (
        <div id="rsvp_section"><RSVPSection /></div>
      ) : (
        <div id="rsvp_section"><RSVPForm /></div>
      )}
      <footer className="bg-royal-deepPurple text-royal-gold/50 py-8 text-center font-cinzel text-xs tracking-widest">
        <p>&copy; Inviteera. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default function MarriageTemplate1() {
  return (
    <MarriageContent />
  );
}
