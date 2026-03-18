import { EventsSection } from "./components/EventsSection";
import { HeroSection } from "./components/HeroSection";
import { CountdownSection } from "./components/Countdown";
import { PhotoGallery } from "./components/PhotoGallery";
import { RSVPSection } from "./components/RSVPSection";
import RSVPForm from "./components/RSVPform";

import "./index.css";
import { useInvitationId } from '@/core/hooks/useInvitationId';

function MarriageContent() {
  const { invitationId, isRSVP } = useInvitationId();
  
  return (
    <div className="t6"> 
      <div id="hero_section">
        <HeroSection />
      </div>
      <div id="countdown_section">
        <CountdownSection />
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
      <footer
        className="w-full py-10 flex flex-col items-center gap-3 text-center px-4"
        style={{ background: 'hsl(var(--secondary))', borderTop: '1px solid hsl(var(--border))' }}
      >
        <div className="flex items-center gap-3 w-48">
          <div className="flex-1 h-px" style={{ background: 'hsl(var(--border))' }} />
          <span style={{ color: 'hsl(var(--accent))', fontSize: 10 }}>◆</span>
          <div className="flex-1 h-px" style={{ background: 'hsl(var(--border))' }} />
        </div>
        <p
          className="text-2xl"
          style={{ fontFamily: 'var(--font-script)', color: 'hsl(var(--foreground))' }}
        >
          With Love
        </p>
        <p
          className="text-[10px] uppercase tracking-[0.25em]"
          style={{ fontFamily: 'var(--font-body)', color: 'hsl(var(--muted-foreground))' }}
        >
          &copy; {new Date().getFullYear()} Inviteera. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default function MarriageTemplate1() {
  return (
    <MarriageContent />
  );
}
