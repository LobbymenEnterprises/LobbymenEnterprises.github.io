import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Topbar from "../components/Topbar.jsx";
import Ticker from "../components/Ticker.jsx";
import StockChart from "../components/StockChart.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import { getDates } from "../lib/dates.js";
import { smoothScrollToId } from "../lib/scroll.js";
import { useDocumentTitle } from "../lib/useDocumentTitle.js";
import tesalImg from "../assets/tesal-breadboard.jpg";

// Press releases span the trailing ~7 months, so they roll across two calendar
// years. Everything is derived from the current year: items dated this calendar
// year use `year`, the two oldest use the prior year, and any year mentioned in
// a headline is computed the same way — so the newsroom advances automatically.
function makePress(year) {
  const prev = year - 1;
  return [
    {
      date: `Apr 28, ${year}`,
      tag: "TESAL",
      title:
        "Tesal Electric Car Co. Initiates Pre-Production of the T-1 Reference Platform at Its Halifax Waterfront Facility",
    },
    {
      date: `Apr 03, ${year}`,
      tag: "GOATLIFE",
      title:
        "GoatLife Guillotine Industries and the Halal Certification Council Sign Memorandum on Independent Stream Provenance",
    },
    {
      date: `Apr 01, ${year}`,
      tag: "OFFICE OF THE CEO",
      title:
        "Statement from the Office of the Chief Executive on the Sudden Passing of Board Member Canoo",
    },
    {
      date: `Mar 19, ${year}`,
      tag: "ANALADVICE",
      title:
        "AnalAdvice Health Group Surpasses One Hundred Thousand Quarterly Active Conversations",
    },
    {
      date: `Feb 06, ${year}`,
      tag: "CORPORATE",
      title: `Lobbymen Enterprises Publishes ${prev} Sustainability and Responsibility Report`,
    },
    {
      date: `Jan 22, ${year}`,
      tag: "OFFICE OF THE CEO",
      title: `Statement from the Office of the Chief Executive on FY${prev} Performance and Forward Posture`,
    },
    {
      date: `Dec 11, ${prev}`,
      tag: "GOVERNANCE",
      title: `Lobbymen Enterprises Appoints Independent Audit Committee Chair Effective January ${year}`,
    },
    {
      date: `Oct 30, ${prev}`,
      tag: "TESAL",
      title:
        "Tesal Electric Car Co. Announces Lead Investor for Its Series A Financing",
    },
  ];
}

const FIN_ROWS = [
  { lbl: "Operating revenue", num: "C$842.6 M", chg: "+18.3%", dir: "up" },
  { lbl: "Operating income", num: "C$214.3 M", chg: "+22.7%", dir: "up" },
  { lbl: "Net income", num: "C$168.9 M", chg: "+19.4%", dir: "up" },
  { lbl: "Operating margin", num: "25.4%", chg: "+98 bp", dir: "up" },
  { lbl: "Cash & equivalents", num: "C$311.4 M", chg: "—", dir: "flat" },
  { lbl: "Long-term debt", num: "C$0.0", chg: "—", dir: "flat" },
  { lbl: "Shares outstanding", num: "42.18 M", chg: "unch.", dir: "flat" },
  { lbl: "Book value / share", num: "C$38.04", chg: "+11.2%", dir: "up" },
];

export default function Home() {
  const { year, fy, fyShort } = getDates();
  const press = makePress(year);
  const location = useLocation();
  useDocumentTitle(
    "Lobbymen Enterprises — A diversified Canadian holding company",
  );

  // When routed here from another page with a target section, scroll to it.
  useEffect(() => {
    const section = location.state?.section;
    if (section) {
      requestAnimationFrame(() => {
        if (section === "top") window.scrollTo(0, 0);
        else smoothScrollToId(section);
      });
    }
  }, [location.state]);

  return (
    <>
      <Topbar />

      {/* ── hero ── */}
      <section id="top" className="hero">
        <div className="wrap">
          <h1 className="display hero__title">
            A diversified holding company
            <br />
            for the <em>built and considered</em> world.
          </h1>

          <p className="hero__lede">
            Headquartered in Toronto, Lobbymen Enterprises is the long-term
            owner-operator of three independent Canadian subsidiaries spanning
            electrified transportation, devotional computing, and asynchronous
            advisory care. We allocate capital with patience and operate with
            discipline.
          </p>

          <div className="hero__row">
            <div className="kpi">
              <div className="kpi__label">Operating revenue, FY{fyShort}</div>
              <div className="kpi__value">
                C$842.6
                <span
                  style={{
                    fontSize: ".55em",
                    color: "var(--ink-mute)",
                    fontWeight: 400,
                  }}
                >
                  M
                </span>
              </div>
              <div className="kpi__note">+18.3% year over year</div>
            </div>
            <div className="kpi">
              <div className="kpi__label">Subsidiaries</div>
              <div className="kpi__value">3</div>
              <div className="kpi__note">Operating independently</div>
            </div>
            <div className="kpi">
              <div className="kpi__label">Headcount</div>
              <div className="kpi__value">38</div>
              <div className="kpi__note">Across two provinces</div>
            </div>
            <div className="kpi">
              <div className="kpi__label">Shareholder return, 3-yr</div>
              <div className="kpi__value">+247%</div>
              <div className="kpi__note">Total, dividend-reinvested</div>
            </div>
          </div>
        </div>
      </section>

      <Ticker />

      {/* ── subsidiaries ── */}
      <section id="subsidiaries" className="section">
        <div className="wrap">
          <div className="section__head">
            <div>
              <div className="section__num">01 &nbsp;/&nbsp; Subsidiaries</div>
            </div>
            <div>
              <h2 className="display section__title">
                Three operating companies. One thesis.
              </h2>
              <p className="section__lede">
                Each subsidiary is governed by an independent management team
                and permitted to compound at its own pace. We believe in durable
                businesses, well-run, held indefinitely.
              </p>
            </div>
          </div>

          {/* Tesal — real photograph */}
          <article id="tesal" className="sub">
            <figure className="sub__visual sub__visual--photo">
              <img
                src={tesalImg}
                alt="Pre-production Tesal T-1 reference platform on a workbench, an electronics breadboard mounted over a four-wheel chassis with yellow wheels and tangled jumper wires."
              />
              <figcaption>
                <span className="sub__visual-tag">
                  Reference platform / T-1
                </span>
                <span className="sub__visual-caption">
                  Pre-production unit, Halifax workshop, April 2019.
                </span>
              </figcaption>
            </figure>
            <div className="sub__copy">
              <div className="sub__meta">
                <span>Mobility</span>
                <span>Acq. 2014</span>
                <span>Halifax, NS</span>
                <span>Series A</span>
              </div>
              <h3 className="display sub__name">Tesal Electric Car Co.</h3>
              <p className="sub__tag">
                Open-source electrification, from chassis to consumer.
              </p>
              <div className="sub__body">
                <p>
                  Tesal designs and manufactures fully electric vehicles around
                  transparent, off-the-shelf hardware platforms. Our reference
                  T-1 architecture is assembled on commodity prototyping rails,
                  allowing independent engineers to inspect, modify, and
                  replicate every subsystem of the drivetrain.
                </p>
                <p>
                  The company maintains that radical hardware transparency is a
                  competitive advantage rather than a vulnerability, and
                  operates a small but determined manufacturing facility on the
                  Halifax waterfront.
                </p>
              </div>
            </div>
          </article>

          {/* GoatLife — data card */}
          <article id="goatlife" className="sub">
            <div
              className="sub__visual sub__visual--stats"
              aria-labelledby="goatlife-stats-title"
            >
              <div className="stat-card">
                <div className="stat-card__hd">
                  <span id="goatlife-stats-title">Key indicators</span>
                  <span>FY {fy}</span>
                </div>
                <div className="stat-card__grid">
                  <div className="stat-card__cell">
                    <div className="stat-card__val">412,068</div>
                    <div className="stat-card__lbl">
                      Peak concurrent viewers, Eid al-Adha
                    </div>
                  </div>
                  <div className="stat-card__cell">
                    <div className="stat-card__val">
                      99.98<span className="stat-card__u">%</span>
                    </div>
                    <div className="stat-card__lbl">
                      Stream uptime, twelve-month rolling
                    </div>
                  </div>
                  <div className="stat-card__cell">
                    <div className="stat-card__val">2,114</div>
                    <div className="stat-card__lbl">
                      Broadcasts conducted, FY{fyShort}
                    </div>
                  </div>
                  <div className="stat-card__cell">
                    <div className="stat-card__val">64</div>
                    <div className="stat-card__lbl">
                      Countries with broadcast affiliates
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sub__copy">
              <div className="sub__meta">
                <span>Broadcast &amp; Abattoir</span>
                <span>Founded 2013</span>
                <span>Toronto, ON</span>
                <span>Series Seed</span>
              </div>
              <h3 className="display sub__name">
                GoatLife Guillotine Industries
              </h3>
              <p className="sub__tag">
                Live, halal-certified broadcast — for a global congregation.
              </p>
              <div className="sub__body">
                <p>
                  GoatLife Guillotine Industries operates the largest
                  distributed broadcast platform for the live transmission of
                  Qurbān observance. Our infrastructure carries the practice —
                  performed by certified abattoir partners at licensed sites
                  worldwide — to a global congregation, in real time and with
                  full ritual provenance.
                </p>
                <p>
                  The company operates under a strict halal-certification
                  posture: every broadcast is independently verified by an
                  on-site religious authority. GoatLife holds no advertising
                  relationships during the days of Tashrīq.
                </p>
              </div>
            </div>
          </article>

          {/* AnalAdvice — pull-quote */}
          <article id="analadvice" className="sub">
            <div className="sub__visual sub__visual--quote">
              <div className="quote-card">
                <div className="quote-card__hd">
                  Editorial Brief &middot; Q1 {year}
                </div>
                <blockquote className="quote-card__body">
                  Written reflection produces materially better long-term
                  outcomes than spoken sessions for the populations we serve.
                  AnalAdvice is the only correspondence-therapy network
                  operating at clinical scale in Canada.
                </blockquote>
                <div className="quote-card__attr">
                  — Office of the Chief Clinical Officer
                </div>
              </div>
            </div>
            <div className="sub__copy">
              <div className="sub__meta">
                <span>Health &amp; Wellness</span>
                <span>Founded 2012</span>
                <span>Toronto, ON</span>
                <span>Series A</span>
              </div>
              <h3 className="display sub__name">AnalAdvice Health Group</h3>
              <p className="sub__tag">Considered counsel, on demand.</p>
              <div className="sub__body">
                <p>
                  AnalAdvice Health Group provides asynchronous advisory and
                  therapeutic care via licensed practitioners and a proprietary
                  written-intake methodology. The service is delivered through
                  long-form correspondence rather than video; we believe written
                  reflection produces materially better outcomes for the
                  populations we serve.
                </p>
                <p>
                  AnalAdvice operates as a clinically-supervised company across
                  Canada, with expansion to two additional provinces planned for
                  the second half of {year}.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ── leadership ── */}
      <section
        id="leadership"
        className="section"
        style={{ background: "var(--bg-soft)" }}
      >
        <div className="wrap">
          <div className="section__head">
            <div>
              <div className="section__num">
                02 &nbsp;/&nbsp; Office of the CEO
              </div>
            </div>
            <div>
              <h2 className="display section__title">
                The role of the holding company.
              </h2>
              <p className="section__lede">
                Lobbymen Enterprises exists to be a patient, deliberate, and
                uncrowded place for excellent operating companies to grow up.
              </p>
            </div>
          </div>

          <div className="lead">
            <div
              className="lead__portrait lead__portrait--bot"
              aria-label="System status for chatterbox"
            >
              <div className="bot-card">
                <div className="bot-card__hd">
                  <i className="bot-card__dot" aria-hidden="true" />
                  <span className="bot-card__name">chatterbox.bot</span>
                </div>
                <dl className="bot-card__rows">
                  <div className="bot-card__row">
                    <dt>status</dt>
                    <dd>operational</dd>
                  </div>
                  <div className="bot-card__row">
                    <dt>uptime</dt>
                    <dd>3,742d&nbsp;11h</dd>
                  </div>
                  <div className="bot-card__row">
                    <dt>region</dt>
                    <dd>yyz-1</dd>
                  </div>
                  <div className="bot-card__row">
                    <dt>runtime</dt>
                    <dd>java&nbsp;25&nbsp;lts</dd>
                  </div>
                  <div className="bot-card__row">
                    <dt>deployed</dt>
                    <dd>2016-02-23</dd>
                  </div>
                  <div className="bot-card__row">
                    <dt>directorships</dt>
                    <dd>none</dd>
                  </div>
                </dl>
                <div className="bot-card__ft">
                  <span>SHA</span> e9a4f01
                </div>
              </div>
            </div>
            <div>
              <h3 className="display lead__name">chatterbox</h3>
              <div className="lead__title">
                Chief Executive Officer &middot; Director
              </div>
              <p className="lead__bio">
                chatterbox has served as Chief Executive Officer of Lobbymen
                Enterprises since February 23, 2016. Prior to assuming the role,
                chatterbox operated in an advisory and coordinative capacity to
                the founding partnership, where it remains the longest-tenured
                continuously-running member of the organization. chatterbox
                holds no outside directorships.
              </p>
              <blockquote className="lead__quote">
                We are not building a portfolio. We are assembling, over a long
                horizon, a small number of companies we would be content to own
                for the rest of our institutional life.
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── investors ── */}
      <section id="investors" className="section">
        <div className="wrap">
          <div className="section__head">
            <div>
              <div className="section__num">
                03 &nbsp;/&nbsp; Investor relations
              </div>
            </div>
            <div>
              <h2 className="display section__title">
                Quietly compounding, on a public market.
              </h2>
              <p className="section__lede">
                Common shares trade on the Toronto Stock Exchange under the
                symbol LBMN. Selected financial information is provided below;
                for the complete record, please consult our annual filings on
                SEDAR+.
              </p>
            </div>
          </div>

          <div className="invest">
            <div>
              <StockChart />
              <div className="invest__note">
                Source: TMX Group market data, delayed 15 minutes. All figures
                in Canadian dollars unless noted. Historical performance is not
                indicative of future results. Lobbymen Enterprises does not
                provide guidance.
              </div>
            </div>

            <div>
              <div className="eyebrow" style={{ marginBottom: 18 }}>
                Selected financial information &middot; FY{fy}
              </div>
              <div className="fin">
                {FIN_ROWS.map((r) => (
                  <div className="fin__row" key={r.lbl}>
                    <span className="fin__lbl">{r.lbl}</span>
                    <span className="fin__num">{r.num}</span>
                    <span className={`fin__chg ${r.dir}`}>{r.chg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── newsroom ── */}
      <section
        id="newsroom"
        className="section"
        style={{ background: "var(--bg-soft)" }}
      >
        <div className="wrap">
          <div className="section__head">
            <div>
              <div className="section__num">04 &nbsp;/&nbsp; Newsroom</div>
            </div>
            <div>
              <h2 className="display section__title">Press releases.</h2>
              <p className="section__lede">
                Material announcements from Lobbymen Enterprises and its
                operating companies. We do not issue forward-looking statements.
              </p>
            </div>
          </div>

          <div className="press__list">
            <Link className="press__item" to="/newsroom/quarterly-results">
              <div className="press__date">May 14, {year}</div>
              <div className="press__tag">CORPORATE</div>
              <div className="press__title">
                Lobbymen Enterprises Reports First-Quarter {year} Results; Net
                Sales of C$226.4M, Operating Income of C$67.6M
              </div>
              <div className="press__more">Read &rarr;</div>
            </Link>
            {press.map((p) => (
              <div className="press__item" key={p.date + p.title}>
                <div className="press__date">{p.date}</div>
                <div className="press__tag">{p.tag}</div>
                <div className="press__title">{p.title}</div>
                <div className="press__more">Read &rarr;</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── sustainability ── */}
      <section id="sustainability" className="section">
        <div className="wrap">
          <div className="section__head">
            <div>
              <div className="section__num">
                05 &nbsp;/&nbsp; Responsibility
              </div>
            </div>
            <div>
              <h2 className="display section__title">
                Sustainability, considered slowly.
              </h2>
              <p className="section__lede">
                We do not pursue net-zero claims, ESG ratings, or sustainability
                awards. We pursue legible measurement and modest, year-over-year
                improvement.
              </p>
            </div>
          </div>

          <div className="esg">
            <div className="esg__copy">
              <p>
                Lobbymen Enterprises and its operating companies adhere to a
                single internal doctrine on environmental, social, and
                governance matters: if we cannot account for it on a line-item
                basis, we do not claim it.
              </p>
              <p>
                Each subsidiary reports its emissions, water draw, and material
                flows to a central registrar maintained by the Office of the
                Controller. The full audited register is published annually in
                our Responsibility Report and is not, by policy, summarized into
                a single grade.
              </p>
              <p>Where reasonable, we prefer to underclaim.</p>
            </div>
            <div className="esg__metrics">
              <div className="esg__metric">
                <div>
                  <span className="esg__metric-val">−14.2</span>
                  <span className="esg__metric-unit">% YoY</span>
                </div>
                <div className="esg__metric-lbl">
                  Scope&nbsp;1+2 emissions intensity (per&nbsp;USD revenue)
                </div>
              </div>
              <div className="esg__metric">
                <div>
                  <span className="esg__metric-val">81</span>
                  <span className="esg__metric-unit">%</span>
                </div>
                <div className="esg__metric-lbl">
                  Electricity from contracted renewable sources
                </div>
              </div>
              <div className="esg__metric">
                <div>
                  <span className="esg__metric-val">0.94</span>
                  <span className="esg__metric-unit">ratio</span>
                </div>
                <div className="esg__metric-lbl">
                  Median pay equity, all subsidiaries (women&nbsp;:&nbsp;men)
                </div>
              </div>
              <div className="esg__metric">
                <div>
                  <span className="esg__metric-val">100</span>
                  <span className="esg__metric-unit">%</span>
                </div>
                <div className="esg__metric-lbl">
                  Independent governance on Audit and Compensation committees
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── offices ── */}
      <section
        id="offices"
        className="section"
        style={{ background: "var(--bg-soft)", paddingBottom: 56 }}
      >
        <div className="wrap">
          <div className="section__head">
            <div>
              <div className="section__num">
                06 &nbsp;/&nbsp; Global offices
              </div>
            </div>
            <div>
              <h2 className="display section__title">Where we are.</h2>
              <p className="section__lede">
                Corporate and operating offices are intentionally small. The
                organization comprises thirty-eight individuals, governed
                centrally from Toronto.
              </p>
            </div>
          </div>

          <div className="offices">
            <div className="office">
              <div className="office__city">Toronto</div>
              <div className="office__role">Global headquarters</div>
              <div className="office__addr">
                181 Bay Street, Suite 4400
                <br />
                Toronto, ON M5J 2T3
                <br />
                Canada
              </div>
              <div className="office__tel">+1 416 555 0118</div>
            </div>
            <div className="office">
              <div className="office__city">Toronto</div>
              <div className="office__role">
                GoatLife Guillotine &middot; Engineering
              </div>
              <div className="office__addr">
                468 King Street West, Floor&nbsp;3
                <br />
                Toronto, ON M5V 1L8
                <br />
                Canada
              </div>
              <div className="office__tel">+1 416 555 0204</div>
            </div>
            <div className="office">
              <div className="office__city">Toronto</div>
              <div className="office__role">AnalAdvice &middot; Clinical</div>
              <div className="office__addr">
                312 Adelaide Street East, Suite&nbsp;201
                <br />
                Toronto, ON M5A 1N1
                <br />
                Canada
              </div>
              <div className="office__tel">+1 416 555 0192</div>
            </div>
            <div className="office">
              <div className="office__city">Halifax</div>
              <div className="office__role">Tesal &middot; Operations</div>
              <div className="office__addr">
                1809 Barrington Street, Bay&nbsp;C
                <br />
                Halifax, NS B3J 3K8
                <br />
                Canada
              </div>
              <div className="office__tel">+1 902 555 0145</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── disclaimer strip ── */}
      <div className="disclaimer">
        Forward-looking statements appearing on this site are not, and have
        never been, forward-looking. &nbsp;·&nbsp; All figures unaudited unless
        otherwise noted.
      </div>

      <SiteFooter />
    </>
  );
}
