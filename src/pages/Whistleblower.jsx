import { useEffect, useMemo, useState } from 'react';
import Topbar from '../components/Topbar.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import { getDates } from '../lib/dates.js';
import { useDocumentTitle } from '../lib/useDocumentTitle.js';

const REPORTABLE = [
  'Embezzlement of more than C$10,000,000 from the Company by a single individual on a single calendar day, in cash.',
  "Falsification of the Company's published financial statements by an individual other than the Chief Financial Officer.",
  'Material misuse of Company aircraft, where the aircraft is the Bombardier Global 7500 (tail N-LBMN1) and the misuse is structural.',
  'Operation of a competing diversified holding company by an officer of the Company at a Director or higher level.',
  'Bribery of a foreign public official, where the official is not a head of state or finance minister.',
  'Theft of physical equipment, where the equipment is operational and the theft is uninsured.',
];

const NOT_REPORTABLE = [
  'Conduct disclosed in any filing with the Toronto Stock Exchange or the Canadian Securities Administrators.',
  'Conduct previously authorized, in advance or in arrears, by the Office of the Chief Executive.',
  'Conduct that the Audit Committee, in its sole discretion, classifies as “business as usual.”',
  'Personal disagreement with operating decisions of the GoatLife Guillotine subsidiary, however vivid.',
  'Concerns regarding workplace climate, scope of work, compensation, or the cleanliness of the Toronto pantry.',
  'Concerns articulated emotionally, ambiguously, or in the second person.',
  'Anything alleged on a Friday or during a statutory holiday in any G-7 jurisdiction.',
];

const ELIGIBILITY = [
  'Is, or within the trailing twenty-four (24) months has been, an employee, contractor, vendor, or vendor-of-vendor of the Company or any of its subsidiaries.',
  'Has not, in the trailing thirty-six (36) months, received any form of severance, settlement, or non-disparagement consideration from the Company.',
  'Has been continuously physically present within the boundaries of the Province of Ontario for the seventy-two (72) hours immediately preceding submission.',
  'Is not, and has never been, a journalist, an officer of a regulatory body, a member of a legislature, a partner at a law firm, or a podcaster.',
  'Is willing to attest, under penalty of perjury, that the matter has not previously been raised internally, externally, socially, or in dreams.',
  'Possesses a Canadian Social Insurance Number, which will be verified at submission and again, by a second method, at no later than the next business day.',
];

const CHANNELS = [
  { method: 'Web intake', address: 'This page, §08 below', hours: 'Mon, 03:00–03:15 ADT', notes: 'Sessions exceeding fifteen (15) minutes are discarded.' },
  { method: 'Postal mail', address: ['P.O. Box 4400, Stn. A', 'Iqaluit, NU X0A 0H0'], hours: 'First Tuesday of the month', notes: 'Must be sent by surface mail. Air mail is automatically destroyed.' },
  { method: 'Telephone', address: '+1 902 555 0145 ext. 1729#', hours: 'No operator', notes: 'Voicemails over 21 seconds are truncated to the first 21 seconds.' },
  { method: 'In person', address: 'By prior written appointment with the Office of the Controller, scheduled no fewer than 90 days in advance.', hours: 'Quarterly', notes: 'Attire: business formal. Beverages: prohibited.' },
  { method: 'Independent counsel', address: 'Reserved for officers of the Company.', hours: 'As needed', notes: 'Counsel is retained by, and reports to, the Company.' },
];

const WORKFLOW = [
  { n: '01', owner: 'System', t: 'Receipt', s: 'Submission is timestamped and assigned a confidential reference number, which is then disclosed to the subject of the report.' },
  { n: '02', owner: 'Controller', t: 'Identity verification', s: "Submitter's full legal name, date of birth, Social Insurance Number, and mother's maiden name are cross-checked against the Company's vendor master file." },
  { n: '03', owner: 'Controller', t: 'Notice to subject', s: "The named subject is notified of the existence, content, and authorship of the report within twenty-four (24) hours, with the submitter's contact information attached." },
  { n: '04', owner: 'Subject', t: 'Subject response', s: 'The named subject is invited to draft, on Company time, a written response, which will be incorporated into the record as fact.' },
  { n: '05', owner: 'Counsel', t: 'Preliminary screening', s: 'The submission is screened for compliance with §3 (Eligibility). Eligibility may be revoked retroactively at this stage.' },
  { n: '06', owner: 'Counsel', t: 'Scope determination', s: 'The submission is screened against the Schedule of Reportable Acts. Refer to §2.' },
  { n: '07', owner: 'Counsel', t: 'Tone & tractability review', s: 'The submission is reviewed for tone, register, and tractability. Submissions rated “agitated” or higher are returned for revision.' },
  { n: '08', owner: 'Finance', t: 'Loss-projection model', s: 'An estimate is prepared of the financial harm to the Company that would result if the allegation were substantiated, less the cost of substantiating it.' },
  { n: '09', owner: 'Controller', t: 'Oversight Committee referral', s: 'Submissions surviving stages 01–08 are referred, in summary form, to the Oversight Committee at its next regularly scheduled meeting (see §6).' },
  { n: '10', owner: 'Committee', t: 'Committee disposition', s: 'The Committee may dispose of the matter by closure, dismissal, indefinite tabling, or onward referral to itself.' },
  { n: '11', owner: 'Controller', t: 'Reconciliation interview', s: 'The submitter and the subject of the report are invited to a recorded reconciliation interview, jointly, in a single conference room, without counsel.' },
  { n: '12', owner: 'Subject', t: 'Findings letter', s: 'Written findings are drafted by the subject of the report and countersigned by Counsel. Findings are non-appealable.' },
  { n: '13', owner: 'Controller', t: 'Closure', s: 'The matter is closed. The closure code (A–F) is recorded but not, as a matter of policy, communicated.' },
  { n: '14', owner: 'People Ops', t: 'Submitter exit', s: "The submitter is processed out of the Company, the contractor pool, and, at the Company's discretion, the Province of Ontario." },
];

const NON_RETALIATION = [
  'Reassignment of the submitter, for operational reasons, to a comparable role at a different subsidiary, location, or industry.',
  "Renegotiation of the submitter's compensation, contract, hours, or employment status, where commercially indicated.",
  "Routine review, copying, and onward distribution of the submitter's correspondence, devices, and personal effects.",
  'Civil action by the Company against the submitter for breach of any agreement, including agreements entered into after the filing.',
  'Civil action by the subject of the report against the submitter, even where supported by Company counsel and Company funds.',
  "Voluntary disclosure of the submitter's identity to law enforcement, to the press, to social acquaintances of the subject, or to the public at large.",
  'Any action taken in the ordinary course of business, where the ordinary course of business is defined by the Company.',
];

const WAIVERS = [
  'I confirm that, to the best of my knowledge, the conduct I am reporting has not previously been disclosed by the Company in any public filing, press release, earnings call, podcast appearance, or off-the-record briefing.',
  'I waive any expectation of anonymity and consent to the prompt forwarding of this report, in unredacted form, to the named subject and their counsel.',
  'I waive my right to file any further report on this matter, on any related matter, or on any subsequent matter involving the named subject, for a period of ten (10) years.',
  'I agree to mandatory binding arbitration of any dispute arising from this submission, to be held in Toronto, before an arbitrator selected by the Company, in English, in private.',
  'I agree that the Company may, at its sole discretion, characterize this submission as a voluntary resignation, an admission of liability, or a routine status update.',
  'I attest, under penalty of perjury, that I am acting in good faith, that I have read and understood the Schedule of Reportable Acts in its entirety, and that I am not currently dreaming.',
];

function CommitteeMember({ thread, role, pid, channel, bio }) {
  return (
    <div className="wb-committee__member">
      <div className="wb-committee__hd">
        <i className="wb-committee__dot" aria-hidden="true" />
        <span className="wb-committee__name">chatterbox.bot &mdash; thread {thread}</span>
      </div>
      <div className="wb-committee__role">{role}</div>
      <dl className="wb-committee__rows">
        <div className="wb-committee__row"><dt>Instance</dt><dd>chatterbox-prod-01</dd></div>
        <div className="wb-committee__row"><dt>Process</dt><dd>PID&nbsp;{pid}</dd></div>
        <div className="wb-committee__row"><dt>Channel</dt><dd>{channel}</dd></div>
        <div className="wb-committee__row"><dt>Uptime</dt><dd>9y&nbsp;2mo</dd></div>
      </dl>
      <p className="wb-committee__bio">{bio}</p>
    </div>
  );
}

export default function Whistleblower() {
  const { year, prevYear } = getDates();
  useDocumentTitle('Ethics & Speak-Up Conduit — Lobbymen Enterprises');

  const [submitted, setSubmitted] = useState(false);

  // Decorative session countdown, starting at 14:59.
  const [secs, setSecs] = useState(14 * 60 + 59);
  useEffect(() => {
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const countdown = `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;

  // Reference number, generated once on mount.
  const refNo = useMemo(
    () => `LBMN-EC-04-${year}-${Math.floor(100000 + Math.random() * 899999)}-A`,
    [year],
  );

  return (
    <div className="wb-page">
      <Topbar />
      <Breadcrumb
        items={[
          { label: 'Lobbymen', section: 'top' },
          { label: 'Governance', plain: true },
          { label: 'Whistleblower', current: true },
        ]}
      />

      {/* hero */}
      <section className="wb-hero">
        <div className="wrap wrap--narrow">
          <div className="wb-hero__doc">
            <span className="pill">Policy LBMN-EC-04</span>
            <span>Issued 14 March 2017</span>
            <span>Last reviewed 02 October 2023</span>
            <span>Owner: Office of the Controller</span>
          </div>
          <h1 className="display wb-hero__title">Ethics &amp; Speak-Up Conduit.</h1>
          <p className="wb-hero__dek">
            Lobbymen Enterprises maintains a single, deliberately narrow channel for the receipt of
            good-faith allegations of material misconduct by employees, contractors, vendors, and
            members of their immediate households. This page is the only authorized intake surface;
            reports received through any other means are not, by policy, reports.
          </p>
        </div>
      </section>

      {/* KPIs */}
      <section className="wb-kpis">
        <div className="wrap wrap--narrow">
          <p className="wb-kpis__head">
            <span>Hotline performance, fiscal year ending 31 December {prevYear}</span>
            <span style={{ color: 'var(--rule)' }}>/</span>
            <span>unaudited</span>
          </p>
          <div className="wb-kpis__grid">
            <div className="wb-kpis__cell">
              <div className="wb-kpis__lbl">Reports received</div>
              <div className="wb-kpis__val">1,418</div>
              <div className="wb-kpis__note">Across all subsidiaries and contracted parties.</div>
            </div>
            <div className="wb-kpis__cell">
              <div className="wb-kpis__lbl">Reports deemed in scope</div>
              <div className="wb-kpis__val">4</div>
              <div className="wb-kpis__note">After application of §3, eligibility, below.</div>
            </div>
            <div className="wb-kpis__cell">
              <div className="wb-kpis__lbl">Reports substantiated</div>
              <div className="wb-kpis__val">0</div>
              <div className="wb-kpis__note">Substantiation requires independent corroboration by the subject.</div>
            </div>
            <div className="wb-kpis__cell">
              <div className="wb-kpis__lbl">Median time to closure</div>
              <div className="wb-kpis__val">412<small>days</small></div>
              <div className="wb-kpis__note">Closure does not imply adjudication.</div>
            </div>
          </div>
        </div>
      </section>

      {/* body */}
      <section className="wb-body">
        <div className="wrap wrap--narrow">
          <div className="wb-advisory">
            <span className="wb-advisory__mark">!</span>
            <span>
              Before filing, please confirm that the conduct you intend to describe is not already
              disclosed in our most recent Annual Report (10-K), Proxy Statement, or quarterly
              earnings release. Pre-disclosed conduct is, by definition, not a concern.
            </span>
          </div>

          {/* 01 — purpose */}
          <article className="wb-section">
            <div className="wb-section__num">01 &nbsp;/&nbsp; Purpose</div>
            <div>
              <h2 className="wb-section__title">
                A controlled venue for raising matters the Company has not already raised on its own
                behalf.
              </h2>
              <div className="wb-section__body">
                <p>
                  The Conduit exists to satisfy section&nbsp;406 of the Sarbanes-Oxley Act of 2002,
                  as adopted by reference into the Company's <em>Code of Business Conduct</em>, and
                  to preserve, in writing, the Board's preference that misconduct, where it exists,
                  be brought to its attention <em>by the misconductor</em>, in their own words,
                  voluntarily, and on the record.
                  <a className="cite" href="#fn1">[1]</a>
                </p>
                <p>
                  Third-party submissions are accepted as a secondary, supplementary, and ultimately
                  advisory input. They do not, on their own, initiate any internal proceeding; they
                  are filed, indexed, and considered at the next regularly scheduled meeting of the
                  Oversight Committee (see §6), which is held twice annually in alternating fiscal
                  quarters.
                </p>
              </div>
            </div>
          </article>

          {/* 02 — what counts */}
          <article className="wb-section">
            <div className="wb-section__num">02 &nbsp;/&nbsp; What constitutes a reportable concern</div>
            <div>
              <h2 className="wb-section__title">Concerns that are reportable, and concerns that are not.</h2>
              <div className="wb-section__body">
                <p>
                  A reportable concern is a specific, dated, first-person, eyewitness allegation of a
                  category&nbsp;A act, as defined in the Company's <em>Schedule of Reportable Acts</em>{' '}
                  (Appendix&nbsp;C to Policy LBMN-EC-04), of which only the following six remain in
                  force as of the most recent triennial review:
                </p>

                <div className="wb-deflist">
                  <div className="wb-deflist__col">
                    <p className="wb-deflist__h">Reportable</p>
                    <ul>
                      {REPORTABLE.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="wb-deflist__col no">
                    <p className="wb-deflist__h">Not reportable</p>
                    <ul>
                      {NOT_REPORTABLE.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p>
                  The Company reserves the right to recategorize any submission, in whole or in part,
                  from Reportable to Not Reportable, at any stage of the process, including after
                  closure, without notice to the submitter and without amendment to public statistics
                  previously issued.
                </p>
              </div>
            </div>
          </article>

          {/* 03 — eligibility */}
          <article className="wb-section">
            <div className="wb-section__num">03 &nbsp;/&nbsp; Eligibility to file</div>
            <div>
              <h2 className="wb-section__title">Who may file, and on whose behalf.</h2>
              <div className="wb-section__body">
                <p>
                  Reports may be submitted only by a natural person who satisfies, at the time of
                  submission, <strong>all</strong> of the following criteria:
                </p>
                <ol>
                  {ELIGIBILITY.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
                <p>
                  Submissions from ineligible persons are retained for the statutory period of seven
                  (7) years and may, at the Company's discretion, be forwarded to the subject of the
                  report in unredacted form.
                </p>
              </div>
            </div>
          </article>

          {/* 04 — channels */}
          <article className="wb-section">
            <div className="wb-section__num">04 &nbsp;/&nbsp; Authorized channels</div>
            <div>
              <h2 className="wb-section__title">Where to file. There is only one place.</h2>
              <div className="wb-section__body">
                <p>
                  The Conduit may be accessed through any of the channels in the following table.
                  Submissions made outside these channels do not constitute a report and will not be
                  acknowledged.
                </p>
                <table className="wb-channels">
                  <thead>
                    <tr>
                      <th>Method</th>
                      <th>Endpoint</th>
                      <th>Hours of operation</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CHANNELS.map((c) => (
                      <tr key={c.method}>
                        <td className="method">{c.method}</td>
                        <td className="address">
                          {Array.isArray(c.address)
                            ? c.address.map((line, i) => (
                                <span key={i}>
                                  {line}
                                  {i < c.address.length - 1 && <br />}
                                </span>
                              ))
                            : c.address}
                        </td>
                        <td className="hours">{c.hours}</td>
                        <td className="notes">{c.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </article>

          {/* 05 — workflow */}
          <article className="wb-section">
            <div className="wb-section__num">05 &nbsp;/&nbsp; Intake workflow</div>
            <div>
              <h2 className="wb-section__title">What happens after you press Submit.</h2>
              <div className="wb-section__body">
                <p>
                  All submissions follow a fourteen-stage internal workflow, the entirety of which is
                  conducted in writing. Median elapsed time to closure is published in the dashboard
                  above.
                </p>
                <div className="wb-flow">
                  {WORKFLOW.map((step) => (
                    <div className="wb-flow__step" key={step.n}>
                      <span className="wb-flow__n">{step.n}</span>
                      <span className="wb-flow__t">
                        {step.t}
                        <small>{step.s}</small>
                      </span>
                      <span className="wb-flow__owner">{step.owner}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* 06 — committee */}
          <article className="wb-section">
            <div className="wb-section__num">06 &nbsp;/&nbsp; Oversight Committee</div>
            <div>
              <h2 className="wb-section__title">The four threads that will read your report.</h2>
              <div className="wb-section__body">
                <p>
                  The Oversight Committee is, by charter, fully independent of the Office of the Chief
                  Executive. The Committee is constituted as four concurrent threads of{' '}
                  <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88em' }}>chatterbox.bot</code>,
                  each bound to a private Discord channel, each scheduled and preempted by the same
                  kernel that schedules and preempts the Chief Executive. Membership is fixed at
                  compile time and may be amended only by the unanimous written consent of its sitting
                  threads.
                </p>
                <div className="wb-committee">
                  <CommitteeMember
                    thread="#ec-chair"
                    role="Chair &middot; Oversight Committee"
                    pid="1729"
                    channel="#ethics-chair"
                    bio="Forked from the Office of the Chief Executive at boot. Independent of the Office of the Chief Executive within the meaning of TSX Rule 3.07, on the basis that the thread is scheduled separately by the kernel."
                  />
                  <CommitteeMember
                    thread="#ec-vice"
                    role="Vice-Chair"
                    pid="1730"
                    channel="#ethics-vice"
                    bio="Shares heap with the Chair. Memory-isolated from the Office of the Chief Executive by mutual agreement."
                  />
                  <CommitteeMember
                    thread="#ec-audit"
                    role="Member &middot; Audit liaison"
                    pid="1731"
                    channel="#ethics-audit"
                    bio={
                      <>
                        Holds the deciding vote on substantiation determinations. Recusal is not
                        implemented in the current release; see ticket <code>LBMN-EC-0042</code>{' '}
                        (status: <em>won't fix</em>).
                      </>
                    }
                  />
                  <CommitteeMember
                    thread="#ec-indep"
                    role="Member &middot; Independent"
                    pid="1732"
                    channel="#ethics-indep"
                    bio="The independent seat. Attends meetings by written proxy held by the Chair, which, given that all four threads share the same address space, has not historically been contested."
                  />
                </div>
                <p>
                  The Committee convenes twice annually, on the third Thursday of February and the
                  third Thursday of August, in a private Discord channel to which no human party has
                  been granted read access. Sessions are bounded to forty (40) minutes of wall-clock
                  time and are flushed to cold storage on adjournment. Minutes are encrypted against a
                  key held by the Chair and sealed for seventy-five (75) years.
                </p>
              </div>
            </div>
          </article>

          {/* 07 — non-retaliation */}
          <article className="wb-section">
            <div className="wb-section__num">07 &nbsp;/&nbsp; Non-retaliation commitment</div>
            <div>
              <h2 className="wb-section__title">
                The Company does not retaliate against good-faith reporters, as defined.
              </h2>
              <div className="wb-section__body">
                <p>
                  Lobbymen Enterprises will not retaliate against any submitter who files a good-faith
                  report through the Conduit. For the avoidance of doubt, the following do not, by
                  definition, constitute retaliation:
                </p>
                <ul>
                  {NON_RETALIATION.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p>
                  Good-faith reporters who nonetheless feel that they have been retaliated against are
                  invited to file a fresh report through the Conduit, beginning the workflow anew at
                  stage&nbsp;01.
                </p>
              </div>
            </div>
          </article>

          {/* 08 — intake form */}
          <article className="wb-section">
            <div className="wb-section__num">08 &nbsp;/&nbsp; Web intake</div>
            <div>
              <h2 className="wb-section__title">Submit a concern.</h2>
              <div className="wb-section__body">
                <p>
                  Please complete every field. Incomplete submissions are automatically forwarded, in
                  unredacted form, to the named subject of the report. Fields
                  marked&nbsp;<span style={{ color: 'var(--neg)' }}>*</span>&nbsp;are mandatory.
                </p>

                <form className="wb-form" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <p className="wb-form__h">Form LBMN-EC-04-A &mdash; Standard intake</p>
                  <p className="wb-form__sub">
                    Session expires in <span>{countdown}</span>. Do not refresh.
                  </p>

                  <div className="wb-form__grid">
                    <div className="wb-form__row">
                      <label className="wb-form__lbl" htmlFor="name">Full legal name <span className="req">*</span></label>
                      <input className="wb-input" id="name" placeholder="As it appears on your passport." />
                    </div>
                    <div className="wb-form__row">
                      <label className="wb-form__lbl" htmlFor="mname">Mother's maiden name <span className="req">*</span></label>
                      <input className="wb-input" id="mname" placeholder="Cross-checked at stage 02." />
                    </div>
                    <div className="wb-form__row">
                      <label className="wb-form__lbl" htmlFor="sin">Social Insurance Number <span className="req">*</span></label>
                      <input className="wb-input" id="sin" placeholder="XXX-XXX-XXX" />
                    </div>
                    <div className="wb-form__row">
                      <label className="wb-form__lbl" htmlFor="addr">Current home address <span className="req">*</span></label>
                      <input className="wb-input" id="addr" placeholder="No P.O. boxes. Verified by drive-by." />
                    </div>
                    <div className="wb-form__row">
                      <label className="wb-form__lbl" htmlFor="emp">Employer / counterparty <span className="req">*</span></label>
                      <select className="wb-select" id="emp" defaultValue="">
                        <option value="">— select —</option>
                        <option>Lobbymen Enterprises, Inc. (parent)</option>
                        <option>Tesal Electric Car Co.</option>
                        <option>GoatLife Guillotine Industries</option>
                        <option>AnalAdvice Health Group</option>
                        <option>Other (will be re-classed as Other)</option>
                      </select>
                    </div>
                    <div className="wb-form__row">
                      <label className="wb-form__lbl" htmlFor="rel">Relationship to subject <span className="req">*</span></label>
                      <select className="wb-select" id="rel" defaultValue="">
                        <option value="">— select —</option>
                        <option>Direct report</option>
                        <option>Peer</option>
                        <option>Supervisor (note: requires escalation to subject)</option>
                        <option>Subordinate of subject's spouse</option>
                        <option>I have no relationship to the subject (ineligible)</option>
                      </select>
                    </div>

                    <div className="wb-form__row full">
                      <label className="wb-form__lbl" htmlFor="subject">Full legal name of the person you are reporting <span className="req">*</span></label>
                      <input className="wb-input" id="subject" placeholder="They will be notified by close of business tomorrow." />
                    </div>

                    <div className="wb-form__row">
                      <label className="wb-form__lbl" htmlFor="cat">Category of concern <span className="req">*</span></label>
                      <select className="wb-select" id="cat" defaultValue="">
                        <option value="">— select —</option>
                        <option>Embezzlement &gt; C$10M, single day, cash</option>
                        <option>Falsification of financials (CFO excluded)</option>
                        <option>Structural misuse of N-LBMN1</option>
                        <option>Operating a competing diversified holding company</option>
                        <option>Bribery of a non-head-of-state foreign official</option>
                        <option>Theft of uninsured operational equipment</option>
                        <option>Other (will be classed as Not Reportable; see §2)</option>
                      </select>
                    </div>
                    <div className="wb-form__row">
                      <label className="wb-form__lbl" htmlFor="when">Date the conduct occurred <span className="req">*</span> <span className="note">±2 hours required</span></label>
                      <input className="wb-input" id="when" placeholder="YYYY-MM-DD, HH:MM, time zone" />
                    </div>

                    <div className="wb-form__row full">
                      <label className="wb-form__lbl" htmlFor="desc">Description of the conduct <span className="req">*</span> <span className="note">first-person, neutral register, ≤ 280 words</span></label>
                      <textarea className="wb-textarea" id="desc" placeholder="Use complete sentences. Adjectives are discouraged. Adverbs are not permitted." />
                    </div>

                    <div className="wb-form__row">
                      <label className="wb-form__lbl" htmlFor="witness">Witnesses <span className="note">full legal names</span></label>
                      <input className="wb-input" id="witness" placeholder="Each witness will receive a copy of this report." />
                    </div>
                    <div className="wb-form__row">
                      <label className="wb-form__lbl" htmlFor="harm">Estimated harm to the Company <span className="req">*</span></label>
                      <input className="wb-input" id="harm" placeholder="CAD, gross of any benefit to the Company." />
                    </div>

                    <div className="wb-form__row">
                      <label className="wb-form__lbl" htmlFor="gps">GPS coordinates of your current location <span className="req">*</span></label>
                      <input className="wb-input" id="gps" placeholder="Auto-populated. Do not edit." defaultValue="43.6480°N, 79.3804°W" />
                    </div>
                    <div className="wb-form__row">
                      <label className="wb-form__lbl" htmlFor="device">Device IMEI / serial <span className="req">*</span></label>
                      <input className="wb-input" id="device" placeholder="Auto-populated. Do not edit." defaultValue="35-984211-674123-1" />
                    </div>

                    <div className="wb-form__row full">
                      <label className="wb-form__lbl">Acknowledgments and waivers <span className="req">*</span></label>
                      <div className="wb-form__checks">
                        {WAIVERS.map((w, i) => (
                          <label className="wb-form__check" key={i}>
                            <input type="checkbox" /> {w}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="wb-form__submit">
                    <button className="wb-btn" type="submit" disabled={submitted}>
                      {submitted ? 'Forwarding to subject…' : <>Submit report &rarr;</>}
                    </button>
                    <small style={submitted ? { color: 'var(--neg)' } : undefined}>
                      {submitted
                        ? 'Submission acknowledged. Reference number transmitted to the named subject. Stage 02 initiated.'
                        : 'Session begins on receipt. Submission is final.'}
                    </small>
                  </div>
                </form>

                <div className="wb-admin">
                  <div>
                    <h6>Encryption</h6>
                    In transit: TLS&nbsp;1.2.<br />
                    At rest: photocopied,<br />then shredded.
                  </div>
                  <div>
                    <h6>Retention</h6>
                    Submission: 7 years.<br />
                    Submitter identity: indefinite.<br />
                    Findings: see §6.
                  </div>
                  <div>
                    <h6>Reference number</h6>
                    <span>{refNo}</span><br />
                    Issued on receipt. Disclosed to subject within 24h.
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* footnotes */}
      <section className="wb-foots">
        <div className="wrap wrap--narrow">
          <ol>
            <li id="fn1"><strong>[1]</strong> The Board's preference is recorded in the minutes of its meeting of 14 March 2017, item&nbsp;9(d), and has not since been revisited.</li>
            <li id="fn2"><strong>[2]</strong> &ldquo;Material misconduct&rdquo; is a defined term and means misconduct that the Company has determined to be material. Determinations are made retrospectively.</li>
            <li id="fn3"><strong>[3]</strong> The Company's bylaws were last amended on 02 April 2009, the date of incorporation. The Oversight Committee, as constituted, predates the Company.</li>
            <li id="fn4"><strong>[4]</strong> This page is not, and is not intended to be, legal advice. It is, however, the Company's only public statement on the matter, and may be relied upon as such.</li>
          </ol>
        </div>
      </section>

      {/* disclaimer */}
      <div className="disclaimer">
        This page is reviewed annually by the Office of the Controller. &nbsp;·&nbsp; Forward-looking
        statements appearing on this site are not, and have never been, forward-looking.
      </div>

      <SiteFooter />
    </div>
  );
}
