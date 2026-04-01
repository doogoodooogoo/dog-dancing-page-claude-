import { useState, useEffect } from 'react';
import dogSvg from '../assets/images/dog.svg';
import '../styles/animations.css';

const NOTES = ['♪', '♫', '♬', '🎵'];
const DANCE_CLASSES = {
  dance: 'dancing',
  jump: 'dancing-jump',
  sway: 'dancing-sway',
};

function FloatingNote({ note, style }) {
  return (
    <span
      style={{
        position: 'absolute',
        fontSize: '1.8rem',
        animation: 'floatNote 1.5s ease-out forwards',
        pointerEvents: 'none',
        ...style,
      }}
    >
      {note}
    </span>
  );
}

function FloatingHeart({ style }) {
  return (
    <span
      style={{
        position: 'absolute',
        fontSize: '1.4rem',
        animation: 'floatHeart 2s ease-out forwards',
        pointerEvents: 'none',
        ...style,
      }}
    >
      ❤️
    </span>
  );
}

function Sparkle({ style }) {
  return (
    <span
      style={{
        position: 'absolute',
        fontSize: '1.2rem',
        animation: `sparkle ${1 + Math.random()}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 2}s`,
        pointerEvents: 'none',
        ...style,
      }}
    >
      ✨
    </span>
  );
}

export default function DancingDog({ isPlaying, danceMode }) {
  const [effects, setEffects] = useState([]);
  const [sparkles] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 60}%`,
    }))
  );

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const type = Math.random() > 0.4 ? 'note' : 'heart';
      const newEffect = {
        id: Date.now() + Math.random(),
        type,
        note: NOTES[Math.floor(Math.random() * NOTES.length)],
        left: `${20 + Math.random() * 60}%`,
        top: `${10 + Math.random() * 40}%`,
      };
      setEffects(prev => [...prev.slice(-8), newEffect]);
    }, 600);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const dogClass = isPlaying ? DANCE_CLASSES[danceMode] : '';

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '340px',
        width: '100%',
      }}
    >
      {/* 배경 반짝임 */}
      {isPlaying && sparkles.map(s => (
        <Sparkle key={s.id} style={{ left: s.left, top: s.top }} />
      ))}

      {/* 떠다니는 이펙트 */}
      {effects.map(e =>
        e.type === 'note' ? (
          <FloatingNote key={e.id} note={e.note} style={{ left: e.left, top: e.top }} />
        ) : (
          <FloatingHeart key={e.id} style={{ left: e.left, top: e.top }} />
        )
      )}

      {/* 강아지 */}
      <img
        src={dogSvg}
        alt="댄싱 강아지"
        className={dogClass}
        style={{
          width: 'clamp(160px, 30vw, 240px)',
          height: 'auto',
          filter: isPlaying
            ? 'drop-shadow(0 10px 20px rgba(200, 145, 74, 0.5))'
            : 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
          transition: 'filter 0.3s ease',
          position: 'relative',
          zIndex: 2,
        }}
      />

      {/* 그림자 */}
      <div
        style={{
          width: 'clamp(100px, 18vw, 150px)',
          height: '18px',
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.15)',
          marginTop: '-8px',
          animation: isPlaying ? `shadow 0.8s ease-in-out infinite` : 'none',
          transition: 'opacity 0.3s',
        }}
      />
    </div>
  );
}
