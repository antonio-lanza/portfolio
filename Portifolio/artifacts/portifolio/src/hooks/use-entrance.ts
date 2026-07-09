import { createContext, useContext, useEffect, useState, type ReactNode, createElement } from 'react';
import { useReducedMotion } from 'framer-motion';

const EntranceContext = createContext(true);

export function EntranceProvider({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(reduceMotion === true);

  useEffect(() => {
    if (reduceMotion) {
      setReady(true);
      return;
    }

    let frame = 0;
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setReady(true));
    });

    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  return createElement(EntranceContext.Provider, { value: ready }, children);
}

export function useEntrance() {
  return useContext(EntranceContext);
}
