import { ImageResponse } from 'next/og';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at 50% 35%, rgba(183,244,107,0.32), rgba(5,5,5,1) 62%)',
          color: 'white',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 28,
            borderRadius: 120,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
          }}
        />
        <div
          style={{
            fontSize: 220,
            fontWeight: 900,
            letterSpacing: '-0.08em',
            transform: 'translateY(-8px)',
          }}
        >
          E
        </div>
      </div>
    ),
    size
  );
}