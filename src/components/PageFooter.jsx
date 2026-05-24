import { Link } from 'react-router-dom';
import { useSectionNav } from '../lib/scroll.js';
import { getDates } from '../lib/dates.js';

// Simple inline footer used on the newsroom pages. links: array of
// { label, to?, section? }.
export default function PageFooter({ links }) {
  const goToSection = useSectionNav();
  const { year } = getDates();
  return (
    <footer className="sitefoot">
      <div className="wrap sitefoot__inner">
        <div>© 2009 — {year} Lobbymen Enterprises, Inc. &nbsp;·&nbsp; All rights reserved.</div>
        <div>
          {links.map((link, i) => (
            <span key={link.label}>
              {i > 0 && <> &nbsp;·&nbsp; </>}
              {link.to ? (
                <Link to={link.to}>{link.label}</Link>
              ) : (
                <button
                  type="button"
                  className="sitefoot__link"
                  onClick={() => goToSection(link.section ?? 'top')}
                >
                  {link.label}
                </button>
              )}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
