import { createContext, useContext, useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'lbmn-mode';
const ThemeContext = createContext(null);

function readStored() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

function systemMode() {
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }) {
  // The pre-paint script in index.html has already set data-mode; mirror it here.
  const [mode, setMode] = useState(
    () => document.documentElement.getAttribute('data-mode') || readStored() || systemMode(),
  );

  // Keep the <html data-mode> attribute in sync with React state.
  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode);
  }, [mode]);

  // Reflect OS preference live, but only while the user hasn't picked a side.
  useEffect(() => {
    const mql = matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (!readStored()) setMode(systemMode());
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    setMode((cur) => {
      const next = cur === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore persistence failures (private mode, etc.) */
      }
      // Transitions fire only during an explicit toggle, so in-page scrolling
      // can never trigger a stray background interpolation (read as a flash).
      const root = document.documentElement;
      root.classList.add('is-mode-toggling');
      window.setTimeout(() => root.classList.remove('is-mode-toggling'), 320);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
