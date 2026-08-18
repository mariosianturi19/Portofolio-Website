import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export const alt = 'Mario Sianturi — Software Engineer and Full-Stack Web Developer portfolio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#0A0A0F',
          color: '#EDEDF2',
          fontFamily: 'Arial, sans-serif',
          padding: '66px 72px',
        }}
      >
        {/* Lime accent block */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            right: -60,
            top: -60,
            width: 260,
            height: 260,
            borderRadius: 999,
            background: '#D4FF4F',
            opacity: 0.12,
          }}
        />

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', fontSize: 22, fontWeight: 900, letterSpacing: -0.5 }}>
              MARIO<span style={{ color: '#D4FF4F' }}>.</span>SIANTURI
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                border: '1px solid rgba(237,237,242,0.25)',
                borderRadius: 999,
                padding: '11px 20px',
                color: '#D4FF4F',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 1.5,
              }}
            >
              OPEN TO SOFTWARE ENGINEER ROLES
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', width: 920, gap: 20 }}>
            <div style={{ display: 'flex', color: '#D4FF4F', fontSize: 16, fontWeight: 700, letterSpacing: 3 }}>
              COMPUTER ENGINEERING GRADUATE
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: 76, fontWeight: 900, letterSpacing: -3, lineHeight: 1.02, textTransform: 'uppercase' }}>
              <div style={{ display: 'flex' }}>Software</div>
              <div style={{ display: 'flex', color: 'transparent', WebkitTextStroke: '1.5px #EDEDF2' }}>Engineer</div>
            </div>
            <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
              Full-Stack Web Developer
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(237,237,242,0.12)',
              paddingTop: 24,
            }}
          >
            <div style={{ display: 'flex', color: '#8B8B99', fontSize: 15, letterSpacing: 2 }}>
              REACT&nbsp;&nbsp;/&nbsp;&nbsp;NEXT.JS&nbsp;&nbsp;/&nbsp;&nbsp;TYPESCRIPT&nbsp;&nbsp;/&nbsp;&nbsp;REST API&nbsp;&nbsp;/&nbsp;&nbsp;MYSQL
            </div>
            <div style={{ display: 'flex', color: '#8B8B99', fontSize: 15 }}>
              mariosianturi.vercel.app
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
