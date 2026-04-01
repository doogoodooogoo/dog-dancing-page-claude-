const DANCE_MODES = [
  { key: 'dance', label: '🕺 댄스', title: '신나는 댄스' },
  { key: 'jump', label: '⬆️ 점프', title: '점프 댄스' },
  { key: 'sway', label: '🌊 흔들기', title: '좌우 흔들기' },
];

export default function AnimationControls({ isPlaying, onToggle, danceMode, onModeChange }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        padding: '24px',
        background: 'rgba(255,255,255,0.25)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.4)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '380px',
      }}
    >
      {/* 시작/정지 버튼 */}
      <button
        onClick={onToggle}
        aria-label={isPlaying ? '애니메이션 정지' : '애니메이션 시작'}
        style={{
          padding: '14px 40px',
          fontSize: '1.1rem',
          fontWeight: '700',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          background: isPlaying
            ? 'linear-gradient(135deg, #ff6b6b, #ee5a24)'
            : 'linear-gradient(135deg, #55efc4, #00b894)',
          color: '#fff',
          animation: isPlaying ? 'pulse 2s ease-in-out infinite' : 'none',
          transition: 'background 0.3s ease, transform 0.1s ease',
          letterSpacing: '0.5px',
          minWidth: '160px',
        }}
        onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
        onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {isPlaying ? '⏸ 정지' : '▶ 시작'}
      </button>

      {/* 댄스 모드 선택 */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {DANCE_MODES.map(mode => (
          <button
            key={mode.key}
            onClick={() => onModeChange(mode.key)}
            title={mode.title}
            aria-pressed={danceMode === mode.key}
            style={{
              padding: '8px 18px',
              fontSize: '0.9rem',
              fontWeight: '600',
              border: '2px solid',
              borderColor: danceMode === mode.key ? '#ff6b6b' : 'rgba(255,255,255,0.6)',
              borderRadius: '30px',
              cursor: 'pointer',
              background: danceMode === mode.key
                ? 'rgba(255,107,107,0.2)'
                : 'rgba(255,255,255,0.3)',
              color: danceMode === mode.key ? '#c0392b' : '#555',
              transition: 'all 0.2s ease',
            }}
          >
            {mode.label}
          </button>
        ))}
      </div>
    </div>
  );
}
