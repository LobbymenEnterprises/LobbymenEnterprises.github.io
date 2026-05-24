import Topbar from '../components/Topbar.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import PageFooter from '../components/PageFooter.jsx';
import { getDates } from '../lib/dates.js';
import { smoothScrollToId } from '../lib/scroll.js';
import { useDocumentTitle } from '../lib/useDocumentTitle.js';

const supStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: '9px',
  verticalAlign: '5px',
  color: 'var(--ink-mute)',
};

export default function FinancialStatements() {
  const { year, qEnd, qEndPrev, prevYearEnd, fyEnd, releaseDate } = getDates();
  useDocumentTitle('Lobbymen Enterprises — Q1 Condensed Consolidated Financial Statements');

  return (
    <div className="fs-page">
      <Topbar />
      <Breadcrumb
        items={[
          { label: 'Lobbymen', section: 'top' },
          { label: 'Newsroom', section: 'newsroom' },
          { label: `Q1 ${year} Results`, to: '/newsroom/quarterly-results' },
          { label: 'Consolidated Financial Statements', current: true },
        ]}
      />

      {/* doc head */}
      <section className="doc">
        <div className="wrap">
          <div className="doc__meta">
            <span className="pill">Filing &middot; Unaudited</span>
            <span>Fiscal Q1 {year}</span>
            <span>Three months ended {qEnd}</span>
            <span>Published {releaseDate}</span>
          </div>
          <h1 className="display doc__title">Condensed consolidated financial&nbsp;statements.</h1>
          <p className="doc__sub">
            Companion to the press release of {releaseDate} announcing the financial results of
            Lobbymen&nbsp;Enterprises for the three-month period ended {qEnd}. All figures are
            unaudited and presented in millions of Canadian dollars, except per-share amounts and
            share counts.
          </p>

          <nav className="toc" aria-label="Document sections">
            <button type="button" className="toc__item linklike" onClick={() => smoothScrollToId('operations')}>
              <span className="num">I &middot; Statements of</span>
              <span className="lbl">Operations</span>
            </button>
            <button type="button" className="toc__item linklike" onClick={() => smoothScrollToId('balance')}>
              <span className="num">II &middot; Statements of</span>
              <span className="lbl">Financial position</span>
            </button>
            <button type="button" className="toc__item linklike" onClick={() => smoothScrollToId('cashflow')}>
              <span className="num">III &middot; Statements of</span>
              <span className="lbl">Cash flows</span>
            </button>
          </nav>
        </div>
      </section>

      {/* I — Operations */}
      <section id="operations" className="stmt">
        <div className="wrap">
          <div className="stmt__head">
            <p className="stmt__org">Lobbymen Enterprises, Inc.</p>
            <p className="stmt__title">Condensed Consolidated Statements of Operations <em>(Unaudited)</em></p>
            <p className="stmt__units">
              In millions of Canadian dollars, except number of shares (reflected in thousands) and
              per-share amounts.
            </p>
          </div>

          <div className="fstable-scroll">
            <table className="fstable">
              <thead>
                <tr className="colgrp-row">
                  <th></th>
                  <th colSpan="2" className="span2">Three months ended</th>
                  <th></th>
                </tr>
                <tr>
                  <th></th>
                  <th>{qEnd}</th>
                  <th>{qEndPrev}</th>
                  <th>YoY change</th>
                </tr>
              </thead>
              <tbody>
                <tr className="section section--first"><td>Net sales:</td><td></td><td></td><td></td></tr>
                <tr className="indent-1"><td>Vehicles &amp; mobility hardware</td><td><span className="cur">18.4</span></td><td>9.2</td><td>+100.0%</td></tr>
                <tr className="indent-1"><td>Broadcast &amp; stream rights</td><td>89.7</td><td>84.5</td><td>+6.2%</td></tr>
                <tr className="indent-1"><td>Correspondence-care subscriptions</td><td>118.3</td><td>94.8</td><td>+24.8%</td></tr>
                <tr className="subtotal"><td>Total net sales <sup style={supStyle}>(1)</sup></td><td><span className="cur">226.4</span></td><td>188.5</td><td>+20.1%</td></tr>

                <tr className="section"><td>Cost of sales:</td><td></td><td></td><td></td></tr>
                <tr className="indent-1"><td>Vehicles &amp; mobility hardware</td><td>22.1</td><td>14.8</td><td>+49.3%</td></tr>
                <tr className="indent-1"><td>Broadcast, stream &amp; subscription delivery</td><td>78.4</td><td>71.6</td><td>+9.5%</td></tr>
                <tr className="subtotal"><td>Total cost of sales</td><td>100.5</td><td>86.4</td><td>+16.3%</td></tr>
                <tr className="subtotal"><td>Gross margin</td><td>125.9</td><td>102.1</td><td>+23.3%</td></tr>

                <tr className="section"><td>Operating expenses:</td><td></td><td></td><td></td></tr>
                <tr className="indent-1"><td>Research and development</td><td>18.6</td><td>13.7</td><td>+35.8%</td></tr>
                <tr className="indent-1"><td>Selling, general and administrative</td><td>39.7</td><td>33.9</td><td>+17.1%</td></tr>
                <tr className="subtotal"><td>Total operating expenses</td><td>58.3</td><td>47.6</td><td>+22.5%</td></tr>

                <tr className="spacer"><td></td><td></td><td></td><td></td></tr>
                <tr className="subtotal"><td>Operating income</td><td>67.6</td><td>54.5</td><td>+24.0%</td></tr>
                <tr><td>Other income / (expense), net</td><td>2.1</td><td>1.3</td><td>+61.5%</td></tr>
                <tr className="subtotal"><td>Income before provision for income taxes</td><td>69.7</td><td>55.8</td><td>+24.9%</td></tr>
                <tr><td>Provision for income taxes</td><td>17.1</td><td>13.8</td><td>+23.9%</td></tr>
                <tr className="total"><td>Net income</td><td><span className="cur">52.6</span></td><td>42.0</td><td>+25.2%</td></tr>

                <tr className="spacer"><td></td><td></td><td></td><td></td></tr>
                <tr className="section"><td>Earnings per share:</td><td></td><td></td><td></td></tr>
                <tr className="indent-1"><td>Basic</td><td><span className="cur">1.25</span></td><td>0.99</td><td>+26.3%</td></tr>
                <tr className="indent-1"><td>Diluted</td><td><span className="cur">1.24</span></td><td>0.99</td><td>+25.3%</td></tr>

                <tr className="section"><td>Shares used in computing earnings per share:</td><td></td><td></td><td></td></tr>
                <tr className="indent-1"><td>Basic</td><td>42,055</td><td>42,440</td><td>−0.9%</td></tr>
                <tr className="indent-1"><td>Diluted</td><td>42,478</td><td>42,580</td><td>−0.2%</td></tr>

                <tr className="spacer"><td></td><td></td><td></td><td></td></tr>
                <tr className="footref"><td><sup>(1)</sup>Net sales by reportable segment:</td><td></td><td></td><td></td></tr>
                <tr className="indent-1"><td>Tesal Electric Car Co.</td><td><span className="cur">18.4</span></td><td>9.2</td><td>+100.0%</td></tr>
                <tr className="indent-1"><td>GoatLife Guillotine Industries</td><td>89.7</td><td>84.5</td><td>+6.2%</td></tr>
                <tr className="indent-1"><td>AnalAdvice Health Group</td><td>118.3</td><td>94.8</td><td>+24.8%</td></tr>
                <tr className="subtotal"><td>Total net sales</td><td><span className="cur">226.4</span></td><td>188.5</td><td>+20.1%</td></tr>

                <tr className="spacer"><td></td><td></td><td></td><td></td></tr>
                <tr className="footref"><td><sup>(1)</sup>Net sales by geography:</td><td></td><td></td><td></td></tr>
                <tr className="indent-1"><td>Canada</td><td><span className="cur">182.1</span></td><td>156.4</td><td>+16.4%</td></tr>
                <tr className="indent-1"><td>United States</td><td>23.7</td><td>18.9</td><td>+25.4%</td></tr>
                <tr className="indent-1"><td>Rest of world</td><td>20.6</td><td>13.2</td><td>+56.1%</td></tr>
                <tr className="subtotal"><td>Total net sales</td><td><span className="cur">226.4</span></td><td>188.5</td><td>+20.1%</td></tr>
              </tbody>
            </table>
          </div>

          <div className="stmt__notes">
            <ol>
              <li>
                <sup>(1)</sup>
                <span>
                  Net sales attributable to each reportable segment are presented gross of
                  intersegment eliminations, which were not material during either period. The
                  Company operates each subsidiary as an independent reporting unit.
                </span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* II — Balance sheets */}
      <section id="balance" className="stmt">
        <div className="wrap">
          <div className="stmt__head">
            <p className="stmt__org">Lobbymen Enterprises, Inc.</p>
            <p className="stmt__title">Condensed Consolidated Statements of Financial Position <em>(Unaudited)</em></p>
            <p className="stmt__units">
              In millions of Canadian dollars, except number of shares (reflected in thousands) and
              par value.
            </p>
          </div>

          <div className="fstable-scroll">
            <table className="fstable">
              <thead>
                <tr>
                  <th></th>
                  <th>{qEnd}</th>
                  <th>{prevYearEnd}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="section section--first"><td>ASSETS</td><td></td><td></td></tr>

                <tr className="section"><td>Current assets:</td><td></td><td></td></tr>
                <tr className="indent-1"><td>Cash and cash equivalents</td><td><span className="cur">324.8</span></td><td>311.4</td></tr>
                <tr className="indent-1"><td>Marketable securities</td><td>156.2</td><td>142.8</td></tr>
                <tr className="indent-1"><td>Accounts receivable, net</td><td>48.6</td><td>52.1</td></tr>
                <tr className="indent-1"><td>Inventories</td><td>14.7</td><td>12.3</td></tr>
                <tr className="indent-1"><td>Other current assets</td><td>22.4</td><td>19.8</td></tr>
                <tr className="subtotal"><td>Total current assets</td><td>566.7</td><td>538.4</td></tr>

                <tr className="section"><td>Non-current assets:</td><td></td><td></td></tr>
                <tr className="indent-1"><td>Marketable securities</td><td>218.4</td><td>224.7</td></tr>
                <tr className="indent-1"><td>Property, plant and equipment, net</td><td>142.6</td><td>138.9</td></tr>
                <tr className="indent-1"><td>Intangible assets, net</td><td>31.2</td><td>32.8</td></tr>
                <tr className="indent-1"><td>Goodwill</td><td>89.4</td><td>89.4</td></tr>
                <tr className="indent-1"><td>Other non-current assets</td><td>38.7</td><td>36.2</td></tr>
                <tr className="subtotal"><td>Total non-current assets</td><td>520.3</td><td>522.0</td></tr>
                <tr className="total"><td>Total assets</td><td><span className="cur">1,087.0</span></td><td>1,060.4</td></tr>

                <tr className="spacer"><td></td><td></td><td></td></tr>
                <tr className="section"><td>LIABILITIES AND SHAREHOLDERS’ EQUITY</td><td></td><td></td></tr>

                <tr className="section"><td>Current liabilities:</td><td></td><td></td></tr>
                <tr className="indent-1"><td>Accounts payable</td><td><span className="cur">64.2</span></td><td>71.8</td></tr>
                <tr className="indent-1"><td>Other current liabilities</td><td>47.9</td><td>52.4</td></tr>
                <tr className="indent-1"><td>Deferred revenue</td><td>86.3</td><td>79.1</td></tr>
                <tr className="subtotal"><td>Total current liabilities</td><td>198.4</td><td>203.3</td></tr>

                <tr className="section"><td>Non-current liabilities:</td><td></td><td></td></tr>
                <tr className="indent-1"><td>Deferred revenue</td><td>12.4</td><td>14.7</td></tr>
                <tr className="indent-1"><td>Long-term debt</td><td>—</td><td>—</td></tr>
                <tr className="indent-1"><td>Other non-current liabilities</td><td>28.6</td><td>26.9</td></tr>
                <tr className="subtotal"><td>Total non-current liabilities</td><td>41.0</td><td>41.6</td></tr>
                <tr className="subtotal"><td>Total liabilities</td><td>239.4</td><td>244.9</td></tr>

                <tr><td>Commitments and contingencies <sup style={supStyle}>(2)</sup></td><td></td><td></td></tr>

                <tr className="section"><td>Shareholders’ equity:</td><td></td><td></td></tr>
                <tr className="indent-1"><td>Common shares and additional paid-in capital, no par value: unlimited authorized; 42,055 and 42,180 issued and outstanding, respectively</td><td>412.7</td><td>408.3</td></tr>
                <tr className="indent-1"><td>Retained earnings</td><td>437.1</td><td>412.5</td></tr>
                <tr className="indent-1"><td>Accumulated other comprehensive loss</td><td>(2.2)</td><td>(5.3)</td></tr>
                <tr className="subtotal"><td>Total shareholders’ equity</td><td>847.6</td><td>815.5</td></tr>
                <tr className="total"><td>Total liabilities and shareholders’ equity</td><td><span className="cur">1,087.0</span></td><td>1,060.4</td></tr>
              </tbody>
            </table>
          </div>

          <div className="stmt__notes">
            <ol>
              <li>
                <sup>(2)</sup>
                <span>
                  The Company has no material legal proceedings, off-balance-sheet arrangements, or
                  contingent liabilities outstanding at {qEnd}. Operating lease commitments are
                  disclosed in the Company’s most recent annual filing on SEDAR+.
                </span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* III — Cash flows */}
      <section id="cashflow" className="stmt">
        <div className="wrap">
          <div className="stmt__head">
            <p className="stmt__org">Lobbymen Enterprises, Inc.</p>
            <p className="stmt__title">Condensed Consolidated Statements of Cash Flows <em>(Unaudited)</em></p>
            <p className="stmt__units">In millions of Canadian dollars.</p>
          </div>

          <div className="fstable-scroll">
            <table className="fstable">
              <thead>
                <tr className="colgrp-row">
                  <th></th>
                  <th colSpan="2" className="span2">Three months ended</th>
                </tr>
                <tr>
                  <th></th>
                  <th>{qEnd}</th>
                  <th>{qEndPrev}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="section section--first"><td>Cash, cash equivalents, and restricted cash and cash equivalents, beginning balances</td><td><span className="cur">311.4</span></td><td>268.9</td></tr>

                <tr className="section"><td>Operating activities:</td><td></td><td></td></tr>
                <tr className="indent-1"><td>Net income</td><td>52.6</td><td>42.0</td></tr>
                <tr className="indent-1"><td>Adjustments to reconcile net income to cash generated by operating activities:</td><td></td><td></td></tr>
                <tr className="indent-2"><td>Depreciation and amortization</td><td>6.8</td><td>5.9</td></tr>
                <tr className="indent-2"><td>Share-based compensation expense</td><td>4.2</td><td>3.5</td></tr>
                <tr className="indent-2"><td>Other</td><td>(0.6)</td><td>(0.8)</td></tr>
                <tr className="indent-1"><td>Changes in operating assets and liabilities:</td><td></td><td></td></tr>
                <tr className="indent-2"><td>Accounts receivable, net</td><td>3.5</td><td>(1.2)</td></tr>
                <tr className="indent-2"><td>Inventories</td><td>(2.4)</td><td>(0.8)</td></tr>
                <tr className="indent-2"><td>Other current and non-current assets</td><td>(4.9)</td><td>(3.4)</td></tr>
                <tr className="indent-2"><td>Accounts payable</td><td>(7.6)</td><td>(4.1)</td></tr>
                <tr className="indent-2"><td>Deferred revenue</td><td>4.9</td><td>6.2</td></tr>
                <tr className="indent-2"><td>Other current and non-current liabilities</td><td>(2.1)</td><td>1.4</td></tr>
                <tr className="subtotal"><td>Cash generated by operating activities</td><td>54.4</td><td>48.7</td></tr>

                <tr className="section"><td>Investing activities:</td><td></td><td></td></tr>
                <tr className="indent-1"><td>Purchases of marketable securities</td><td>(38.2)</td><td>(24.1)</td></tr>
                <tr className="indent-1"><td>Proceeds from maturities of marketable securities</td><td>26.4</td><td>18.3</td></tr>
                <tr className="indent-1"><td>Payments for acquisition of property, plant and equipment</td><td>(9.8)</td><td>(6.7)</td></tr>
                <tr className="indent-1"><td>Other</td><td>(1.2)</td><td>(0.9)</td></tr>
                <tr className="subtotal"><td>Cash used in investing activities</td><td>(22.8)</td><td>(13.4)</td></tr>

                <tr className="section"><td>Financing activities:</td><td></td><td></td></tr>
                <tr className="indent-1"><td>Payments for taxes related to net share settlement of equity awards</td><td>(2.4)</td><td>(2.1)</td></tr>
                <tr className="indent-1"><td>Repurchases of common stock</td><td>(15.8)</td><td>(11.2)</td></tr>
                <tr className="indent-1"><td>Other</td><td>—</td><td>—</td></tr>
                <tr className="subtotal"><td>Cash used in financing activities</td><td>(18.2)</td><td>(13.3)</td></tr>

                <tr className="spacer"><td></td><td></td><td></td></tr>
                <tr className="subtotal"><td>Increase in cash, cash equivalents, and restricted cash and cash equivalents</td><td>13.4</td><td>22.0</td></tr>
                <tr className="total"><td>Cash, cash equivalents, and restricted cash and cash equivalents, ending balances</td><td><span className="cur">324.8</span></td><td>290.9</td></tr>

                <tr className="spacer"><td></td><td></td><td></td></tr>
                <tr className="footref"><td>Supplemental cash flow disclosure:</td><td></td><td></td></tr>
                <tr className="indent-1"><td>Cash paid for income taxes, net</td><td><span className="cur">14.2</span></td><td>9.8</td></tr>
                <tr className="indent-1"><td>Cash paid for interest</td><td>—</td><td>—</td></tr>
              </tbody>
            </table>
          </div>

          <div className="doc__foot">
            <h3>Basis of presentation</h3>
            <p>
              The condensed consolidated financial statements presented above have been prepared in
              accordance with International Financial Reporting Standards (IFRS) as issued by the
              International Accounting Standards Board, and applied on a basis consistent with that of
              the Company’s most recent audited annual financial statements. Certain information and
              footnote disclosures normally included in financial statements prepared in accordance
              with IFRS have been condensed or omitted pursuant to applicable rules and regulations.
            </p>
            <p>
              In the opinion of management, all adjustments considered necessary for a fair statement
              of the results for the interim period have been included. Operating results for the
              three-month period ended {qEnd} are not necessarily indicative of the results that may
              be expected for any other interim period or for the fiscal year ending {fyEnd}.
            </p>
            <p>
              These statements should be read together with the audited consolidated financial
              statements and accompanying notes included in the Company’s annual report for the
              fiscal year ended {prevYearEnd}, which is on file with the Canadian securities
              regulators and available at <span className="mono">www.sedarplus.ca</span>.
            </p>
            <p style={{ color: 'var(--ink-mute)', fontSize: 12, marginTop: 24 }}>
              Forward-looking statements appearing on this page are not, and have never been,
              forward-looking. &nbsp;·&nbsp; All figures unaudited unless otherwise noted.
            </p>
          </div>
        </div>
      </section>

      {/* page-number strip */}
      <div className="pg">
        <div className="wrap pg__inner">
          <span>Lobbymen Enterprises &middot; Q1 {year} Condensed Consolidated Financial Statements</span>
          <span>Page 1 of 1 &middot; Unaudited</span>
        </div>
      </div>

      <PageFooter
        links={[
          { label: '← Back to release', to: '/newsroom/quarterly-results' },
          { label: 'Newsroom', section: 'newsroom' },
          { label: 'Home', to: '/' },
        ]}
      />
    </div>
  );
}
