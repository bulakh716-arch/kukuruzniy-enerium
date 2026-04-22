import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at 50% 35%, rgba(183,244,107,0.34), rgba(5,5,5,1) 68%)',
          color: 'white',
          fontFamily: 'sans-serif',
          borderRadius: 40,
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: 900,
            letterSpacing: '-0.08em',
          }}
        >
          E
        </div>
      </div>
    ),
    size
  );
}