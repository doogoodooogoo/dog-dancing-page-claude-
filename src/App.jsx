import './styles/global.css';
import './styles/animations.css';
import DancingDog from './components/DancingDog';
import AnimationControls from './components/AnimationControls';
import { useAnimation } from './hooks/useAnimation';
import { useEffect } from 'react';

export default function App() {
  const { isPlaying, toggle, danceMode, changeDanceMode } = useAnimation();

  // 키보드 스페이스바 지원
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [toggle]);

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        gap: '24px',
      }}
    >
      {/* 제목 */}
      <h1
        style={{
          fontSize: 'clamp(1.8rem, 5vw, 3rem)',
          fontWeight: '800',
          color: '#fff',
          textAlign: 'center',
          animation: isPlaying ? 'textGlow 2s ease-in-out infinite' : 'none',
          textShadow: '0 2px 10px rgba(0,0,0,0.2)',
          letterSpacing: '-0.5px',
        }}
      >
        🐶 댄싱 강아지 🐶
      </h1>

      {/* 서브 타이틀 */}
      <p
        style={{
          fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
          color: 'rgba(255,255,255,0.85)',
          textAlign: 'center',
          marginTop: '-16px',
        }}
      >
        {isPlaying ? '신나게 춤추는 중! 🎶' : '쉬는 중... 클릭해서 춤추게 해주세요!'}
      </p>

      {/* 강아지 */}
      <DancingDog isPlaying={isPlaying} danceMode={danceMode} />

      {/* 컨트롤 */}
      <AnimationControls
        isPlaying={isPlaying}
        onToggle={toggle}
        danceMode={danceMode}
        onModeChange={changeDanceMode}
      />

      {/* 하단 메시지 */}
      <footer
        style={{
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.6)',
          textAlign: 'center',
        }}
      >
        키보드 스페이스바로도 시작/정지 가능해요!
      </footer>
    </main>
  );
}
