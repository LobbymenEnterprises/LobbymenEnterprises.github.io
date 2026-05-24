import { Link } from 'react-router-dom';
import Topbar from '../components/Topbar.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import { getDates } from '../lib/dates.js';
import { useSectionNav } from '../lib/scroll.js';
import { useDocumentTitle } from '../lib/useDocumentTitle.js';

const noop = (e) => e.preventDefault();

export default function QuarterlyResults() {
  const { year, qEnd, releaseDate, divPayable, divRecord, buybackStart } = getDates();
  const goToSection = useSectionNav();
  useDocumentTitle('Lobbymen Enterprises reports first-quarter results — Newsroom');

  return (
    <>
      <Topbar />
      <Breadcrumb
        items={[
          { label: 'Lobbymen', section: 'top' },
          { label: 'Newsroom', section: 'newsroom' },
          { label: `Q1 ${year} Results`, current: true },
        ]}
      />

      <article className="pr">
        <div className="wrap wrap--narrow">
          <div className="pr__meta">
            <span className="pill">Press release</span>
            <span>{releaseDate}</span>
            <span>Toronto, ON</span>
          </div>

          <h1 className="display pr__title">
            Lobbymen Enterprises reports first-quarter&nbsp;{year} results.
          </h1>

          <p className="pr__dek">
            Quarterly records for total Company revenue, operating income, and diluted earnings per
            share.
            <br /><hr />
            AnalAdvice Health Group surpasses one hundred thousand quarterly active conversations.
          </p>

          <div className="pr__stats">
            <div className="kpi">
              <div className="kpi__label">Net sales</div>
              <div className="kpi__value">C$226.4<span className="kpi__unit">M</span></div>
              <div className="kpi__chg">▲ +20.1% YoY</div>
            </div>
            <div className="kpi">
              <div className="kpi__label">Operating income</div>
              <div className="kpi__value">C$67.6<span className="kpi__unit">M</span></div>
              <div className="kpi__chg">▲ +24.0% YoY</div>
            </div>
            <div className="kpi">
              <div className="kpi__label">Diluted EPS</div>
              <div className="kpi__value">C$1.24</div>
              <div className="kpi__chg">▲ +25.3% YoY</div>
            </div>
          </div>

          <div className="pr__body">
            <p>
              <span className="dateline">Toronto, Ontario —</span> Lobbymen Enterprises (TSX: LBMN)
              today announced financial results for its first quarter of fiscal&nbsp;{year}, ended{' '}
              {qEnd}. The Company posted quarterly net sales of C$226.4&nbsp;million, an increase of
              20.1 percent year over year, and diluted earnings per share of C$1.24, an increase of
              25.3 percent year over year. Operating income rose 24.0 percent to C$67.6&nbsp;million.
            </p>

            <p>
              “We had a deliberate, uncrowded quarter,” said the Office of the Chief Executive of
              Lobbymen Enterprises. “AnalAdvice surpassed one hundred thousand quarterly active
              conversations for the first time; GoatLife maintained 99.98 percent broadcast uptime
              ahead of its seasonally larger second quarter; and Tesal received its first provincial
              Type Approval for the T-1 reference platform. We continue to operate three independent
              companies that are permitted to compound at their own pace.”
            </p>

            <blockquote>
              <p>
                Our cash position now exceeds C$324&nbsp;million and we hold no long-term debt. We
                added modestly to working capital across all three operating companies during the
                quarter, and we did not, at any point, deviate from our stated allocation posture.
              </p>
              <cite>— Office of the Controller, Lobbymen Enterprises</cite>
            </blockquote>

            <p>
              The Board of Directors has declared a cash dividend of C$0.18 per common share,
              representing an increase of two cents over the prior quarter. The dividend is payable
              on {divPayable} to shareholders of record as of the close of business on {divRecord}.
              The Board has additionally authorized the repurchase of up to C$80&nbsp;million of the
              Company’s common stock over the twelve-month period beginning {buybackStart}.
            </p>

            <p>
              Lobbymen Enterprises does not host a conference call following the publication of
              quarterly results. Investors with substantive questions may direct them, in writing, to
              Investor Relations at the address below. The Company will respond in kind, on the
              public record, within ten business days.
            </p>
          </div>

          {/* media */}
          <section className="media">
            <h2>Media</h2>
            <Link className="media__item" to="/newsroom/financial-statements">
              <span className="media__item-l">Condensed Consolidated Financial Statements, Q1&nbsp;{year}</span>
              <span className="media__item-r">View &rarr;</span>
            </Link>
            <button type="button" className="media__item linklike" onClick={() => goToSection('investors')}>
              <span className="media__item-l">LBMN price history and selected financial information</span>
              <span className="media__item-r">View &rarr;</span>
            </button>
            <a className="media__item" href="#" onClick={noop}>
              <span className="media__item-l">Subsidiary segment supplement (PDF)</span>
              <span className="media__item-r">Download &darr;</span>
            </a>
          </section>

          {/* about */}
          <section className="fineprint">
            <h3>About Lobbymen Enterprises</h3>
            <p>
              Lobbymen Enterprises is a diversified Canadian holding company headquartered in
              Toronto. Founded in 2009 and listed on the Toronto Stock Exchange under the symbol
              LBMN, the Company is the long-term owner-operator of three independent subsidiaries —
              Tesal Electric Car Co., GoatLife Guillotine Industries, and AnalAdvice Health Group —
              spanning electrified transportation, devotional computing, and asynchronous advisory
              care. The organization comprises thirty-eight individuals across two provinces.
            </p>
          </section>

          {/* forward-looking */}
          <section className="fineprint">
            <h3>A note on forward-looking statements</h3>
            <p>
              Forward-looking statements appearing on this page are not, and have never been,
              forward-looking. Lobbymen Enterprises does not provide guidance, projections, or
              targets, and the Company has historically declined to participate in industry consensus
              estimates. Historical performance is not indicative of future results.
            </p>
            <p>
              All figures in this release are unaudited, presented in Canadian dollars, and prepared
              in accordance with IFRS as issued by the IASB. A reconciliation to the full condensed
              consolidated financial statements appears on the accompanying page, which forms part of
              this release.
            </p>
          </section>

          {/* contacts */}
          <section className="contacts">
            <div>
              <h3>Investor relations</h3>
              <p>
                <strong>Office of the Controller</strong><br />
                Lobbymen Enterprises<br />
                <span className="mono">ir@lobbymen.ca</span><br />
                <span className="mono">+1 416 555 0118</span>
              </p>
            </div>
            <div>
              <h3>Press contact</h3>
              <p>
                <strong>Office of External Affairs</strong><br />
                Lobbymen Enterprises<br />
                <span className="mono">press@lobbymen.ca</span><br />
                <span className="mono">+1 416 555 0190</span>
              </p>
            </div>
          </section>
        </div>
      </article>

      {/* adjacency */}
      <section className="adjacency">
        <div className="wrap wrap--narrow">
          <div className="adjacency__head">
            <h2 className="display">More from the Newsroom</h2>
            <button type="button" className="linklike" onClick={() => goToSection('newsroom')}>
              All releases &rarr;
            </button>
          </div>
          <div className="adjacency__list">
            <a className="adjacency__item" href="#" onClick={noop}>
              <span className="mono">Apr 28, 2026 &middot; Tesal</span>
              <span className="adjacency__item-title">
                Tesal Electric Car Co. Initiates Pre-Production of the T-1 Reference Platform at Its
                Halifax Waterfront Facility
              </span>
            </a>
            <a className="adjacency__item" href="#" onClick={noop}>
              <span className="mono">Apr 03, 2026 &middot; Goatlife</span>
              <span className="adjacency__item-title">
                GoatLife Guillotine Industries and the Halal Certification Council Sign Memorandum on
                Independent Stream Provenance
              </span>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
