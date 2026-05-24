import { useEffect, useRef } from 'react';

const THIN = ' '; // thin space

// TSX-flavoured market data. Static — Lobbymen does not actually trade.
const ITEMS = [
  { sym: 'LBMN.TO', price: '128.91', chg: '+0.42%', dir: 'up' },
  { sym: 'TESL.V', price: '4.06', chg: '+1.18%', dir: 'up' },
  { sym: 'GOAT.TO', price: '37.44', chg: '-0.21%', dir: 'down' },
  { sym: 'ANAL.TO', price: '19.30', chg: '0.00%', dir: 'flat' },
  { sym: 'S&P/TSX', price: '23,418.12', chg: '+0.18%', dir: 'up' },
  { sym: 'TSX 60', price: '1,402.55', chg: '-0.06%', dir: 'down' },
  { sym: 'TSXV', price: '612.34', chg: '+0.09%', dir: 'up' },
  { sym: 'WCS', price: '54.18', chg: '-0.42%', dir: 'down' },
  { sym: 'GOLD', price: '2,418.30', chg: '+0.27%', dir: 'up' },
  { sym: 'CAD 10Y', price: '3.418%', chg: `-2${THIN}bp`, dir: 'down' },
  { sym: 'USD/CAD', price: '1.3642', chg: '+0.04%', dir: 'up' },
  { sym: 'BTC/CAD', price: '126,184', chg: '+1.81%', dir: 'up' },
];

const arrowFor = (d) => (d === 'up' ? '▲' : d === 'down' ? '▼' : '—');

// Two copies of the list (so the second slides in as the first leaves). The
// CSS animation runs on the compositor (GPU-smooth); JS only measures the
// real first-pass width and writes a matching @keyframes rule so the wrap is
// seamless regardless of font metrics.
export default function Ticker() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    const DURATION = 60;

    const apply = () => {
      let halfWidth = 0;
      for (let i = 0; i < ITEMS.length; i++) {
        halfWidth += track.children[i].offsetWidth;
      }
      // Round to integer px so the keyframe endpoints land on pixel-aligned
      // text positions (avoids a class of font-hint shimmer on Chromium).
      halfWidth = Math.round(halfWidth);
      styleEl.textContent = `
        @keyframes lbmnTickerScroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-${halfWidth}px, 0, 0); }
        }
      `;
      track.style.animation = `lbmnTickerScroll ${DURATION}s linear infinite`;
    };

    const raf = requestAnimationFrame(apply);
    window.addEventListener('resize', apply);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(apply);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', apply);
      styleEl.remove();
    };
  }, []);

  const renderItem = (it, key) => (
    <div className="ticker__item" key={key}>
      <span className="ticker__sym">{it.sym}</span>
      <span className="ticker__price">{it.price}</span>
      <span className={`ticker__chg ${it.dir}`}>
        {arrowFor(it.dir)} {it.chg}
      </span>
    </div>
  );

  return (
    <div className="ticker" aria-label="Market data, delayed 15 minutes">
      <div className="ticker__track" ref={trackRef}>
        {ITEMS.map((it, i) => renderItem(it, `a${i}`))}
        {ITEMS.map((it, i) => renderItem(it, `b${i}`))}
      </div>
    </div>
  );
}
