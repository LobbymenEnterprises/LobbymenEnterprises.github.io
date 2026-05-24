import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Sticky-header offset so anchored sections land just below the topbar.
function headerPadding() {
  return window.innerWidth < 600 ? 64 : 84;
}

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const DURATION = 580;
let activeRaf = 0;

// rAF-driven scroll. The original prototype replaced CSS `scroll-behavior:
// smooth` with this because the native implementation produced a brief flash
// during the scroll on the author's setup; per-frame control avoids it.
export function smoothScrollToY(targetY) {
  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dest = Math.max(0, targetY);
  if (prefersReduced) {
    window.scrollTo(0, dest);
    return;
  }
  if (activeRaf) cancelAnimationFrame(activeRaf);
  const startY = window.scrollY;
  const distance = dest - startY;
  if (Math.abs(distance) < 2) return;
  const startT = performance.now();
  const step = (now) => {
    const t = Math.min((now - startT) / DURATION, 1);
    window.scrollTo(0, startY + distance * easeOutCubic(t));
    activeRaf = t < 1 ? requestAnimationFrame(step) : 0;
  };
  activeRaf = requestAnimationFrame(step);
}

export function smoothScrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const targetY = el.getBoundingClientRect().top + window.scrollY - headerPadding();
  smoothScrollToY(targetY);
}

// Navigate to an in-page section of the home route from anywhere in the app.
// On the home page we scroll directly; elsewhere we route home and pass the
// target section in router state for the Home page to act on.
export function useSectionNav() {
  const navigate = useNavigate();
  const location = useLocation();
  return useCallback(
    (id) => {
      if (location.pathname === '/') {
        if (id === 'top') smoothScrollToY(0);
        else smoothScrollToId(id);
      } else {
        navigate('/', { state: { section: id } });
      }
    },
    [location.pathname, navigate],
  );
}
