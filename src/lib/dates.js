// Dynamic dates so the site never looks stale. Fiscal-year labels resolve to
// (current year − 1); quarterly periods resolve to the current year. Static
// dates in the design (chatterbox uptime, founding years, the Tesal photo
// caption, historical press-release dates) are intentionally left hard-coded
// in the components.
const NB = ' '; // non-breaking space

export function getDates(now = new Date()) {
  const year = now.getFullYear();
  const prevYear = year - 1;
  const fy = year - 1; // most-recently-completed fiscal year
  const fyShort = String(fy).slice(2);

  return {
    now,
    year,
    prevYear,
    fy,
    fyShort,
    qEnd: `March${NB}31,${NB}${year}`,
    qEndPrev: `March${NB}31,${NB}${prevYear}`,
    prevYearEnd: `December${NB}31,${NB}${prevYear}`,
    fyEnd: `December${NB}31,${NB}${year}`,
    releaseDate: `May${NB}14,${NB}${year}`,
    divPayable: `June${NB}5,${NB}${year}`,
    divRecord: `May${NB}29,${NB}${year}`,
    buybackStart: `June${NB}1,${NB}${year}`,
  };
}

const ONES = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
  'seventeen', 'eighteen', 'nineteen',
];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function numberToWords(n) {
  if (n < 20) return ONES[n];
  const ones = n % 10;
  return ones ? `${TENS[Math.floor(n / 10)]}-${ONES[ones]}` : TENS[Math.floor(n / 10)];
}

// Board Member Canoo "passes away" every April 1 (April Fool's), so the
// statement must always read as the current year. Canoo joined the Board on
// 14 September 2012; the death is dated 30 March of the current year, the Board
// meets 31 March, and the moment of silence falls on 1 April. Tenure is thus
// (year − 2013) years and a constant seven months — the 14 Sep → 1 Apr offset
// never changes — and the weekdays are derived so the (in 2026) Monday →
// Tuesday → Wednesday narrative stays self-consistent in any future year.
export function getCanooStatementDates(now = new Date()) {
  const year = now.getFullYear();
  const yearsServed = year - 2013;
  const weekday = (month, day) =>
    new Date(year, month, day).toLocaleDateString('en-US', { weekday: 'long' });

  return {
    year,
    birthYear: 1988,
    statementDate: `April${NB}1,${NB}${year}`,
    deathWeekday: weekday(2, 30), // 30 March
    deathDate: `March${NB}30,${NB}${year}`,
    boardWeekday: weekday(2, 31), // 31 March
    boardDate: `March${NB}31`,
    silenceWeekday: weekday(3, 1), // 1 April
    resultsDate: `May${NB}14,${NB}${year}`,
    yearsWords: numberToWords(yearsServed),
    tenureWords: `${numberToWords(yearsServed)} years and seven months`,
    tenureNumerals: `${yearsServed}${NB}years, 7${NB}months`,
  };
}
