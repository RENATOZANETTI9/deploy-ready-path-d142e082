import { useEffect, useRef, useCallback } from 'react';

interface UseInactivityTimerProps {
  timeout: number;
  onInactive: () => void;
  enabled?: boolean;
}

export const useInactivityTimer = ({ 
  timeout, 
  onInactive, 
  enabled = true 
}: UseInactivityTimerProps) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (enabled) {
      timerRef.current = setTimeout(onInactive, timeout);
    }
  }, [timeout, onInactive, enabled]);

  useEffect(() => {
    if (!enabled) return;

    const events = [
      'mousemove',
      'mousedown', 
      'keydown',
      'scroll',
      'touchstart',
      'touchmove',
      'click'
    ];

    events.forEach(event => {
      document.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [resetTimer, enabled]);
};
