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
