import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSectionNav } from '../lib/scroll.js';

// items: array of { label, to?, section?, current?, plain? }
//  - to:      react-router route (e.g. "/newsroom/quarterly-results")
//  - section: home-page section id (e.g. "newsroom")
//  - current: renders as the non-interactive trailing crumb
//  - plain:   renders as non-interactive text (e.g. a category label)
export default function Breadcrumb({ items }) {
  const goToSection = useSectionNav();
  return (
    <div className="crumb">
      <div className="wrap crumb__inner">
        {items.map((item, i) => (
          <Fragment key={item.label}>
            {i > 0 && <span className="crumb__sep">/</span>}
            {item.current ? (
              <span className="crumb__here">{item.label}</span>
            ) : item.plain ? (
              <span>{item.label}</span>
            ) : item.to ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <button
                type="button"
                className="crumb__link"
                onClick={() => goToSection(item.section ?? 'top')}
              >
                {item.label}
              </button>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
