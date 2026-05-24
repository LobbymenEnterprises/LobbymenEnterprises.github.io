import { useTheme } from '../context/ThemeContext.jsx';

// Sun shows in light mode, moon in dark mode (CSS hides the inactive one).
export default function ThemeToggle() {
  const { toggle } = useTheme();
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label="Toggle color scheme"
      title="Toggle color scheme"
    >
      <svg
        className="icon-sun"
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="3" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="21" />
        <line x1="3" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="21" y2="12" />
        <line x1="5.6" y1="5.6" x2="7" y2="7" />
        <line x1="17" y1="17" x2="18.4" y2="18.4" />
        <line x1="5.6" y1="18.4" x2="7" y2="17" />
        <line x1="17" y1="7" x2="18.4" y2="5.6" />
      </svg>
      <svg className="icon-moon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M20.5 14.7A8 8 0 0 1 9.3 3.5a.5.5 0 0 0-.7-.5 9 9 0 1 0 12.4 12.4.5.5 0 0 0-.5-.7z" />
      </svg>
    </button>
  );
}
