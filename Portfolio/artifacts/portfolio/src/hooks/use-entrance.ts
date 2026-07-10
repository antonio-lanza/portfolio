import { createContext, useContext, useEffect, useRef, useState, type ReactNode, createElement } from 'react';
import { useReducedMotion } from 'framer-motion';

const EntranceContext = createContext(false);

const ENTRANCE_MAX_WAIT_MS = 400;

function markEntranceReady(reduced: boolean) {
  const root = document.documentElement;
  root.dataset.entranceReady = 'true';
  if (reduced) root.dataset.entranceReduced = 'true';
}

function waitForPaint(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

async function waitForEntranceGate(): Promise<void> {
  const fontsReady =
    typeof document !== 'undefined' && document.fonts?.ready
      ? document.fonts.ready.catch(() => undefined)
      : Promise.resolve();

  await Promise.race([
    Promise.all([fontsReady, waitForPaint()]).then(() => undefined),
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, ENTRANCE_MAX_WAIT_MS);
    }),
  ]);
}

export function EntranceProvider({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(() => reduceMotion === true);
  const hasTriggered = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const finish = (reduced: boolean) => {
      if (cancelled) return;
      markEntranceReady(reduced);
      setReady(true);
    };

    if (reduceMotion === true) {
      finish(true);
      return;
    }

    if (reduceMotion !== false) return;

    if (hasTriggered.current) return;
    hasTriggered.current = true;

    void waitForEntranceGate().then(() => finish(false));

    return () => {
      cancelled = true;
    };
  }, [reduceMotion]);

  return createElement(EntranceContext.Provider, { value: ready }, children);
}

export function useEntrance() {
  return useContext(EntranceContext);
}
