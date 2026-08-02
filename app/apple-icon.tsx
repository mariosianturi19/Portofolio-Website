import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export const size = {
  width: 180,
  height: 180,
};

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
          borderRadius: 38,
          background: '#0A0A0F',
          color: '#EDEDF2',
          fontSize: 68,
          fontWeight: 900,
          letterSpacing: -4,
          position: 'relative',
        }}
      >
        MS
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            right: 30,
            bottom: 34,
            width: 22,
            height: 22,
            borderRadius: 999,
            background: '#D4FF4F',
          }}
        />
      </div>
    ),
    size,
  );
}
