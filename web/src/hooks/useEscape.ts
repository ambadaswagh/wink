import { useEffect } from 'react';

const useEscape = (onEscape: () => void) => {
  useEffect(() => {
    const checkEsc = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') onEscape();
    };
    document.body.addEventListener('keydown', checkEsc);
    return () => document.body.removeEventListener('keydown', checkEsc);
  }, [onEscape]);
};

export default useEscape;
