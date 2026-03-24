import React from 'react';
import { Img, staticFile } from 'remotion';
import { C } from '../constants';

interface InstagramMockupProps {
  frame: number;
  showCursor: boolean;
  cursorX: number;
  cursorY: number;
  isFollowing: boolean;
  buttonGlow: boolean;
}

/**
 * Reproduction of the Instagram profile @neurolia_agency in dark mode.
 * Simulates the mobile app UI with header, avatar, stats, bio, and follow button.
 */
export const InstagramMockup: React.FC<InstagramMockupProps> = ({
  frame,
  showCursor,
  cursorX,
  cursorY,
  isFollowing,
  buttonGlow,
}) => {
  const fontUI = "system-ui, -apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";

  return (
    <div
      style={{
        position: 'relative',
        width: 380,
        height: 700,
        backgroundColor: '#000000',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 20,
        overflow: 'hidden',
        fontFamily: fontUI,
      }}
    >
      {/* Status bar placeholder */}
      <div
        style={{
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          fontWeight: 600,
          color: '#FFFFFF',
        }}
      >
        <span>9:41</span>
      </div>

      {/* Header: back arrow, username, dots */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          height: 44,
        }}
      >
        {/* Back arrow */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 19L8 12L15 5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Username */}
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '-0.01em',
          }}
        >
          neurolia_agency
        </span>

        {/* Three dots menu */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="5" r="1.5" fill="white" />
          <circle cx="12" cy="12" r="1.5" fill="white" />
          <circle cx="12" cy="19" r="1.5" fill="white" />
        </svg>
      </div>

      {/* Profile section */}
      <div style={{ padding: '12px 16px 0' }}>
        {/* Avatar + Stats row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 86,
              height: 86,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Img
              src={staticFile('neurolia/logo_neurolia.svg')}
              style={{ width: 52, height: 52 }}
            />
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'space-around',
              textAlign: 'center',
            }}
          >
            <StatItem count="0" label="publications" />
            <StatItem count="890" label="followers" />
            <StatItem count="56" label="ami(e)s" />
          </div>
        </div>

        {/* Bio section */}
        <div style={{ marginTop: 12 }}>
          <span
            style={{
              fontSize: 13,
              color: C.igTextMuted,
              display: 'block',
              marginBottom: 2,
            }}
          >
            {`Cr\u00e9ation digitale`}
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#FFFFFF',
              display: 'block',
              lineHeight: 1.4,
            }}
          >
            {`Agence Web & Automatisations IA`}
          </span>
          <span
            style={{
              fontSize: 14,
              color: '#FFFFFF',
              display: 'block',
              lineHeight: 1.4,
              marginTop: 2,
            }}
          >
            {`Un accompagnement unique pour`}
            <br />
            {`votre business en ligne`}
          </span>
          <span
            style={{
              fontSize: 14,
              color: '#FFFFFF',
              display: 'block',
              lineHeight: 1.4,
              marginTop: 2,
            }}
          >
            {`Sites web \u2022 SEO \u2022 Agents IA`}
          </span>
          <span
            style={{
              fontSize: 14,
              color: C.igLinkBlue,
              display: 'block',
              lineHeight: 1.4,
              marginTop: 2,
            }}
          >
            Narbonne 11100
          </span>
        </div>

        {/* Follow button */}
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <div
            style={{
              flex: 1,
              height: 34,
              borderRadius: 8,
              backgroundColor: isFollowing ? C.igGrey : C.igBlue,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: buttonGlow
                ? '0 0 20px rgba(196,92,59,0.5), 0 0 40px rgba(196,92,59,0.2)'
                : 'none',
              transform: 'scale(1)', // base for animation override
              transition: 'none', // no CSS transitions -- Remotion controls all
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: '#FFFFFF',
                userSelect: 'none',
              }}
            >
              {isFollowing ? 'Abonn\u00e9(e) \u2713' : 'Suivre'}
            </span>
          </div>

          {/* Message button */}
          <div
            style={{
              flex: 1,
              height: 34,
              borderRadius: 8,
              backgroundColor: C.igGrey,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#FFFFFF',
                userSelect: 'none',
              }}
            >
              Message
            </span>
          </div>
        </div>
      </div>

      {/* Grid tabs placeholder */}
      <div
        style={{
          marginTop: 20,
          borderTop: '1px solid rgba(255,255,255,0.15)',
          display: 'flex',
          height: 44,
        }}
      >
        {/* Grid icon (active) */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid #FFFFFF',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" stroke="white" strokeWidth="1.5" />
            <rect x="14" y="3" width="7" height="7" stroke="white" strokeWidth="1.5" />
            <rect x="3" y="14" width="7" height="7" stroke="white" strokeWidth="1.5" />
            <rect x="14" y="14" width="7" height="7" stroke="white" strokeWidth="1.5" />
          </svg>
        </div>
        {/* Tagged icon */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 21V19C20 17.9 19.1 17 18 17H6C4.9 17 4 17.9 4 19V21"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle
              cx="12"
              cy="9"
              r="4"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>

      {/* Empty grid state */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 180,
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />
          <path
            d="M18 24H30M24 18V30"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          Aucune publication
        </span>
      </div>
    </div>
  );
};

/**
 * A single stat item (count + label) for the profile stats row.
 */
const StatItem: React.FC<{ count: string; label: string }> = ({
  count,
  label,
}) => (
  <div>
    <span
      style={{
        fontSize: 16,
        fontWeight: 700,
        color: '#FFFFFF',
        display: 'block',
      }}
    >
      {count}
    </span>
    <span
      style={{
        fontSize: 13,
        color: '#FFFFFF',
        display: 'block',
      }}
    >
      {label}
    </span>
  </div>
);
