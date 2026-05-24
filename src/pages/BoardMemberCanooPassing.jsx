import Topbar from '../components/Topbar.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import { getCanooStatementDates } from '../lib/dates.js';
import { useSectionNav } from '../lib/scroll.js';
import { useDocumentTitle } from '../lib/useDocumentTitle.js';

const noop = (e) => e.preventDefault();

// Canoo "passes away" every April 1 (April Fool's), so the whole statement is
// dated to the current year and kept internally consistent — weekdays, tenure,
// and the in-memoriam years all derive from getCanooStatementDates().
export default function BoardMemberCanooPassing() {
  const goToSection = useSectionNav();
  const {
    year, birthYear, statementDate, deathWeekday, deathDate, boardWeekday,
    boardDate, silenceWeekday, resultsDate, yearsWords, tenureWords, tenureNumerals,
  } = getCanooStatementDates();
  useDocumentTitle(
    'Statement on the sudden passing of Board Member Canoo — Newsroom',
  );

  return (
    <>
      <Topbar />
      <Breadcrumb
        items={[
          { label: 'Lobbymen', section: 'top' },
          { label: 'Newsroom', section: 'newsroom' },
          { label: 'Statement on the passing of Board Member Canoo', current: true },
        ]}
      />

      <article className="pr pr--statement">
        <div className="wrap wrap--narrow">
          <div className="pr__meta">
            <span className="pill">Statement</span>
            <span>Office of the Chief Executive</span>
            <span>{statementDate}</span>
            <span>Toronto, ON</span>
          </div>

          <h1 className="display pr__title">
            Statement on the sudden passing of Board Member Canoo.
          </h1>

          <p className="pr__dek">
            The Company joins in mourning a colleague, an independent director,
            and a long-standing steward of the enterprise.
          </p>

          <div className="pr__body">
            <p>
              <span className="dateline">Toronto, Ontario —</span> Lobbymen Enterprises
              (TSX:&nbsp;LBMN) confirms with profound sadness that Board Member{' '}
              <strong>Canoo</strong>, an independent director of the Company and
              principal engineer of the Tesal T-1 reference platform, passed away
              unexpectedly on the evening of {deathWeekday}, {deathDate}, at
              the family residence in Halifax, Nova Scotia. The cause is understood
              to be natural and was not related, in any capacity, to the affairs of
              the Company or its operating subsidiaries.
            </p>

            <p>
              Canoo joined the Board of Directors of Lobbymen Enterprises in
              September&nbsp;2012 and served continuously thereafter for{' '}
              {tenureWords}. During that tenure they chaired the
              Technology Committee from 2015 to 2021, sat on the Compensation and
              Governance Committee from 2018 onward, and served, by their own quiet
              request, as the standing liaison between the Board and the
              engineering staff of Tesal Electric Car Co. The pre-production T-1
              photographed at the Halifax waterfront workshop last month was, in
              nearly every respect that an outside observer would be inclined to
              measure, the vehicle that Canoo drew.
            </p>

            <blockquote>
              <p>
                Canoo arrived at every meeting with the agenda already read, the
                questions already written down in the margin in pencil, and a
                notebook of drawings that they would, only sometimes, turn around
                to show. They did not raise their voice in {yearsWords} years. We will
                miss them in a manner that is not, and was never going to be,
                proportionate to the size of the organization.
              </p>
              <cite>— Office of the Chief Executive, Lobbymen Enterprises</cite>
            </blockquote>

            <p>
              The Board of Directors convened by telephone on the morning of{' '}
              {boardWeekday}, {boardDate}, and adopted a brief resolution of condolence,
              which has been entered into the minutes and which will be made
              available, in due course, to shareholders of record who request it in
              writing. A moment of silence was observed at the opening of business
              on {silenceWeekday} at all three of the Company’s operating sites. The
              Canadian flag at the Toronto registered office and at the Halifax
              waterfront workshop of Tesal Electric Car Co. will fly at half-mast
              through the end of the week.
            </p>

            <aside className="memoriam">
              <p className="memoriam__eyebrow">In memoriam</p>
              <h2 className="memoriam__name">Canoo<br />{birthYear} — {year}</h2>
              <dl className="memoriam__dl">
                <dt>Joined Board</dt>
                <dd><span className="mono">September&nbsp;14,&nbsp;2012</span></dd>
                <dt>Tenure</dt>
                <dd><span className="mono">{tenureNumerals}</span></dd>
                <dt>Capacity</dt>
                <dd>Independent Director</dd>
                <dt>Committees</dt>
                <dd>Technology (Chair, 2015 — 2021)<br />Compensation &amp; Governance (2018 — {year})</dd>
                <dt>Profession</dt>
                <dd>Electronics Engineer</dd>
                <dt>Of</dt>
                <dd>Halifax, Nova Scotia</dd>
              </dl>
              <p className="memoriam__epitaph" aria-label="Requiescat in pace">
                Requiescat&nbsp;in&nbsp;pace.
              </p>
            </aside>

            <p>
              In accordance with the Company’s by-laws and the policy of the
              Board of Directors with respect to the unforeseen vacancy of a
              director’s seat, the Lead Independent Director will assume Canoo’s
              seat on the Compensation and Governance Committee on an interim
              basis. The office of the standing liaison to Tesal engineering will
              remain vacant for the duration. A formal process for the
              identification of a successor independent director will be initiated
              by the Nominating Committee following the conclusion of the period of
              condolence, and an announcement is anticipated in advance of the{' '}
              {year} Annual Meeting of Shareholders.
            </p>

            <p>
              The Company does not anticipate any disruption to its operations,
              its reporting cadence, or the publication of its first-quarter results
              on the previously announced date of {resultsDate}, and it has
              no further material disclosures to make at this time.
            </p>
          </div>

          {/* arrangements */}
          <section className="fineprint">
            <h3>Arrangements</h3>
            <p>
              A private service will be held for family at a date and location not
              being made public, by the express prior request of Canoo. A
              non-denominational gathering for colleagues, former colleagues, and
              members of the wider Toronto financial community will be arranged in
              the early summer; details will be circulated, in writing, to those for
              whom contact information is on record.
            </p>
            <p>
              In lieu of flowers, the family has asked that donations be directed
              to the Engineers Nova Scotia Education Foundation, which provides
              bursaries to students of engineering from rural and coastal regions
              of the province — a cause that Canoo supported, without publicity,
              for thirty-one consecutive years.
            </p>
          </section>

          {/* note to shareholders */}
          <section className="fineprint">
            <h3>A note to shareholders</h3>
            <p>
              The Board and the Office of the Chief Executive thank shareholders
              in advance for their understanding, and ask that the Company be
              afforded an appropriate quiet period over the days that follow.
              Substantive correspondence may be directed, as ever, to Investor
              Relations, where it will be acknowledged and answered on the regular
              ten business day schedule.
            </p>
          </section>

          {/* contacts */}
          <section className="contacts">
            <div>
              <h3>Press contact</h3>
              <p>
                <strong>Office of External Affairs</strong><br />
                Lobbymen Enterprises<br />
                <span className="mono">press@lobbymen.ca</span><br />
                <span className="mono">+1 416 555 0190</span>
              </p>
            </div>
            <div>
              <h3>Investor relations</h3>
              <p>
                <strong>Office of the Controller</strong><br />
                Lobbymen Enterprises<br />
                <span className="mono">ir@lobbymen.ca</span><br />
                <span className="mono">+1 416 555 0118</span>
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
              <span className="mono">Apr 28, {year} &middot; Tesal</span>
              <span className="adjacency__item-title">
                Tesal Electric Car Co. Initiates Pre-Production of the T-1 Reference Platform at Its
                Halifax Waterfront Facility
              </span>
            </a>
            <a className="adjacency__item" href="#" onClick={noop}>
              <span className="mono">Apr 03, {year} &middot; Goatlife</span>
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
