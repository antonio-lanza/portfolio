import { createContext, useContext, useEffect, useRef, useState, type ReactNode, createElement } from 'react';
import { useReducedMotion } from 'framer-motion';

const EntranceContext = createContext(true);

const ENTRANCE_MAX_WAIT_MS = 120;

export function EntranceProvider({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(() => reduceMotion === true);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (reduceMotion) {
      setReady(true);
      return;
    }

    if (hasTriggered.current) return;
    hasTriggered.current = true;

    let outerFrame = 0;
    let innerFrame = 0;
    let cancelled = false;
    let timeoutId = 0;

    const finish = () => {
      if (!cancelled) setReady(true);
    };

    let finished = false;
    const runFinish = () => {
      if (cancelled || finished) return;
      finished = true;
      finish();
    };

    const schedule = () => {
      outerFrame = requestAnimationFrame(() => {
        innerFrame = requestAnimationFrame(runFinish);
      });
    };

    if (typeof document !== 'undefined' && document.fonts?.ready) {
      timeoutId = window.setTimeout(schedule, ENTRANCE_MAX_WAIT_MS);
      void document.fonts.ready.finally(() => {
        window.clearTimeout(timeoutId);
        schedule();
      });
    } else {
      schedule();
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(outerFrame);
      cancelAnimationFrame(innerFrame);
      window.clearTimeout(timeoutId);
    };
  }, [reduceMotion]);

  return createElement(EntranceContext.Provider, { value: ready }, children);
}

export function useEntrance() {
  return useContext(EntranceContext);
}
