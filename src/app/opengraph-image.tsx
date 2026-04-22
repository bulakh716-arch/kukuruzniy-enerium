import { ImageResponse } from 'next/og';

export const alt = 'Enerium — Your Health, Reimagined by AI';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050505',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Green glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(183,244,107,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Logo text */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: 'white',
            letterSpacing: '-0.04em',
            marginBottom: 16,
          }}
        >
          Enerium
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            background: 'linear-gradient(135deg, #B7F46B, #6DAE2C)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Your Health, Reimagined by AI
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 20,
            color: 'rgba(255,255,255,0.45)',
            marginTop: 20,
            maxWidth: 600,
            textAlign: 'center',
          }}
        >
          Nutrition • Fitness • Hydration • AI Kitchen • Analytics
        </div>
      </div>
    ),
    { ...size }
  );
}
