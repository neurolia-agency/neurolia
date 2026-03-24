import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, SCENES, SERVICES } from '../constants';
import { ServicePunch } from '../components/ServicePunch';

/**
 * Scene 08 -- Services (from=624, duration=144, 12 beats)
 *
 * 4 services punch in sequentially, each with a unique 3D animation.
 * Each service uses its sub-timing and animationType from SERVICES in constants.
 */
export const Scene08Services: React.FC = () => {
  const localFrame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {SERVICES.map((service, i) => {
        // service.from is global — convert to local offset within this scene
        const serviceLocalFrom = service.from - SCENES.services.from;
        const serviceFrame = localFrame - serviceLocalFrom;

        // Only render if within this service's time window (with small buffer)
        if (serviceFrame < -2 || serviceFrame > service.duration + 2) {
          return null;
        }

        // Clamp to valid range
        const clampedFrame = Math.max(0, Math.min(serviceFrame, service.duration));

        return (
          <ServicePunch
            key={i}
            text={service.text}
            fontSize={service.fontSize}
            frame={clampedFrame}
            duration={service.duration}
            animationType={service.animationType}
          />
        );
      })}
    </AbsoluteFill>
  );
};
