'use client';

import { useEffect, useState } from 'react';
import FluidText from '@/components/originkit/ui/fluid-text';

export default function FluidSectionTitle({ text }: { text: string }) {
  const [fontSize, setFontSize] = useState(72);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      setFontSize(width <= 800
        ? Math.min(72, Math.max(48, width * 0.13))
        : Math.min(104, Math.max(62, width * 0.06)));
    };
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <FluidText
      text={text}
      color="#f2f2ef"
      paletteColors={['#FF4F2A', '#C4FF41', '#FFFFFF']}
      splatRadius={7}
      splatForce={10}
      curl={50}
      densityDissipation={5}
      font={{
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontWeight: 800,
        fontSize: `${fontSize}px`,
        lineHeight: '0.9em',
        letterSpacing: '-0.055em',
        textAlign: 'left',
      }}
      style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
    />
  );
}
