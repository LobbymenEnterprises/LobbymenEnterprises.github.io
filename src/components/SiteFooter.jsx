import { Link } from 'react-router-dom';
import { useSectionNav } from '../lib/scroll.js';
import { getDates } from '../lib/dates.js';

const noop = (e) => e.preventDefault();

export default function SiteFooter() {
  const goToSection = useSectionNav();
  const { year } = getDates();

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__top">
          <div>
            <div className="foot__mark">
              <i className="brand__mark" aria-hidden="true" />
              <span>Lobbymen Enterprises</span>
            </div>
            <p className="foot__about">
              A diversified Canadian holding company headquartered in Toronto. Common shares
              listed on the Toronto Stock Exchange under the symbol&nbsp;LBMN.
            </p>
          </div>

          <div className="foot__col">
            <h5>Subsidiaries</h5>
            <ul>
              <li>
                <button type="button" className="linklike" onClick={() => goToSection('tesal')}>
                  Tesal Electric Car Co.
                </button>
              </li>
              <li>
                <button type="button" className="linklike" onClick={() => goToSection('goatlife')}>
                  GoatLife Guillotine Industries
                </button>
              </li>
              <li>
                <button type="button" className="linklike" onClick={() => goToSection('analadvice')}>
                  AnalAdvice Health Group
                </button>
              </li>
            </ul>
          </div>

          <div className="foot__col">
            <h5>Company</h5>
            <ul>
              <li><button type="button" className="linklike" onClick={() => goToSection('leadership')}>Leadership</button></li>
              <li><button type="button" className="linklike" onClick={() => goToSection('investors')}>Investor relations</button></li>
              <li><button type="button" className="linklike" onClick={() => goToSection('newsroom')}>Newsroom</button></li>
              <li><button type="button" className="linklike" onClick={() => goToSection('sustainability')}>Responsibility</button></li>
              <li><button type="button" className="linklike" onClick={() => goToSection('offices')}>Offices</button></li>
            </ul>
          </div>

          <div className="foot__col">
            <h5>Filings</h5>
            <ul>
              <li><a href="#" onClick={noop}>Annual report (10-K)</a></li>
              <li><a href="#" onClick={noop}>Proxy statement</a></li>
              <li><a href="#" onClick={noop}>Audit committee charter</a></li>
              <li><a href="#" onClick={noop}>Code of business conduct</a></li>
            </ul>
          </div>
        </div>

        <div className="foot__bottom">
          <div className="foot__copy">
            © 2009 — {year} Lobbymen Enterprises, Inc.
            <span className="foot__sep"> &nbsp;·&nbsp; </span>
            <span className="foot__rights">All rights reserved.</span>
          </div>
          <div className="foot__legal">
            <a href="#" onClick={noop}>Terms</a>
            <span className="foot__sep"> &nbsp;·&nbsp; </span>
            <a href="#" onClick={noop}>Privacy</a>
            <span className="foot__sep"> &nbsp;·&nbsp; </span>
            <a href="#" onClick={noop}>Accessibility</a>
            <span className="foot__sep"> &nbsp;·&nbsp; </span>
            <Link to="/whistleblower">Whistleblower</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
