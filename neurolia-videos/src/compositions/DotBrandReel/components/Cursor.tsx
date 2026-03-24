import React from 'react';

interface CursorProps {
  x: number;
  y: number;
  pressed: boolean;
}

/**
 * macOS-style cursor (white arrow with black outline and drop shadow).
 * When pressed, shifts down 2px to simulate click feedback.
 */
export const Cursor: React.FC<CursorProps> = ({ x, y, pressed }) => {
  const pressOffset = pressed ? 2 : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + pressOffset,
        width: 24,
        height: 32,
        pointerEvents: 'none',
        filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,0.5))',
        zIndex: 9999,
      }}
    >
      <svg
        width="24"
        height="32"
        viewBox="0 0 24 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Black outline */}
        <path
          d="M2 1L2 23L7.5 17.5L12.5 27L16 25.5L11 15.5L18.5 15.5L2 1Z"
          fill="white"
          stroke="black"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
