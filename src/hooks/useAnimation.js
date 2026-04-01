import { useState, useCallback } from 'react';

export function useAnimation() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [danceMode, setDanceMode] = useState('dance'); // dance | jump | sway

  const toggle = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const changeDanceMode = useCallback((mode) => {
    setDanceMode(mode);
  }, []);

  return { isPlaying, toggle, danceMode, changeDanceMode };
}
