import { useSectionNav } from '../lib/scroll.js';
import ThemeToggle from './ThemeToggle.jsx';

const NAV = [
  { id: 'subsidiaries', label: 'Subsidiaries' },
  { id: 'investors', label: 'Investors' },
  { id: 'newsroom', label: 'Newsroom' },
  { id: 'sustainability', label: 'Responsibility' },
  { id: 'offices', label: 'Offices' },
];

export default function Topbar() {
  const goToSection = useSectionNav();
  return (
    <header className="topbar">
      <div className="wrap topbar__inner">
        <button type="button" className="brand brand--btn" onClick={() => goToSection('top')}>
          <i className="brand__mark" aria-hidden="true" />
          <span>Lobbymen Enterprises</span>
        </button>
        <nav className="nav">
          {NAV.map((item) => (
            <button key={item.id} type="button" onClick={() => goToSection(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="topbar__right">
          <ThemeToggle />
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <span className="topbar__cta">TSX&thinsp;:&thinsp;LBMN</span>
        </div>
      </div>
    </header>
  );
}
