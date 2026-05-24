import { useMemo, useRef, useState } from 'react';

// Bi-weekly closes ending today. The trajectory is fixed (Lobbymen does not
// actually trade on the TSX), but the date labels roll forward every load.
const PRICES = [
  84.2, 86.05, 87.4, 85.9, 88.25, 91.1, 93.45, 91.8, 94.6, 97.2, 95.5, 99.1,
  102.85, 105.4, 103.2, 107.8, 110.45, 109.1, 113.8, 117.2, 119.55, 122.4,
  120.1, 124.85, 127.3, 128.91,
];

const VB_W = 600;
const VB_H = 220;
const PAD_T = 16;
const PAD_B = 24;
const PAD_X = 6;

const fmtDate = (d) =>
  d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
const fmtC = (n) =>
  'C$' + n.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function StockChart() {
  const plotRef = useRef(null);
  const [hover, setHover] = useState(null); // index or null

  const model = useMemo(() => {
    const now = new Date();
    const data = PRICES.map((p, i) => {
      const d = new Date(now);
      d.setDate(d.getDate() - (PRICES.length - 1 - i) * 14);
      return { d: fmtDate(d), p };
    });

    const prices = data.map((r) => r.p);
    const pMin = Math.min(...prices);
    const pMax = Math.max(...prices);
    const padP = (pMax - pMin) * 0.12;
    const yMin = pMin - padP;
    const yMax = pMax + padP;

    const xFor = (i) => PAD_X + (i * (VB_W - PAD_X * 2)) / (data.length - 1);
    const yFor = (p) => PAD_T + ((yMax - p) / (yMax - yMin)) * (VB_H - PAD_T - PAD_B);

    const pts = data.map((row, i) => ({ x: xFor(i), y: yFor(row.p) }));

    // Smooth path via Catmull-Rom → cubic Bezier.
    let line = `M${pts[0].x.toFixed(2)},${pts[0].y.toFixed(2)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;
      const t = 0.18;
      const c1x = p1.x + (p2.x - p0.x) * t;
      const c1y = p1.y + (p2.y - p0.y) * t;
      const c2x = p2.x - (p3.x - p1.x) * t;
      const c2y = p2.y - (p3.y - p1.y) * t;
      line += ` C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
    }
    const area = `${line} L${pts[pts.length - 1].x.toFixed(2)},${VB_H} L${pts[0].x.toFixed(2)},${VB_H} Z`;

    // Axis: 5 evenly-spaced labels; show the year on the leftmost label and on
    // any January entry so the viewer can anchor themselves.
    const axisIdx = [0, 6, 13, 19, data.length - 1];
    const axis = axisIdx.map((i) => {
      const d = new Date(now);
      d.setDate(d.getDate() - (PRICES.length - 1 - i) * 14);
      const m = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
      const showYear = i === 0 || d.getMonth() === 0;
      const y = String(d.getFullYear()).slice(2);
      return showYear ? `${m} '${y}` : m;
    });

    return { data, pts, line, area, axis, basePrice: data[0].p, lastDate: data[data.length - 1].d };
  }, []);

  const { data, pts, line, area, axis, basePrice, lastDate } = model;

  const onMove = (clientX) => {
    const r = plotRef.current.getBoundingClientRect();
    const vbX = ((clientX - r.left) / r.width) * VB_W;
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < pts.length; i++) {
      const d = Math.abs(pts[i].x - vbX);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    setHover(best);
  };

  // Readout — hovered point if hovering, else the latest close.
  const idx = hover ?? data.length - 1;
  const row = data[idx];
  const delta = row.p - basePrice;
  const pct = (delta / basePrice) * 100;
  const arrow = delta >= 0 ? '▲' : '▼';
  const sign = delta >= 0 ? '+' : '−';
  const deltaText =
    `${arrow} ${sign}${Math.abs(delta).toFixed(2)} (${sign}${Math.abs(pct).toFixed(2)}%)` +
    (hover === null ? ' · 1Y' : '');
  const dateText = hover === null ? `Close · ${lastDate}` : row.d;
  const hoverPt = hover === null ? null : pts[idx];

  return (
    <div className="chart" aria-label="LBMN price chart, 12-month">
      <div className="chart__head">
        <div>
          <div className="chart__sym">LBMN &middot; TSX &middot; CAD</div>
          <div className="chart__price">{fmtC(row.p)}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className={`chart__delta${delta < 0 ? ' is-neg' : ''}`}>{deltaText}</div>
          <div className="chart__sym" style={{ marginTop: 6 }}>
            {dateText}
          </div>
        </div>
      </div>

      <div
        className="chart__plot"
        ref={plotRef}
        onPointerMove={(e) => onMove(e.clientX)}
        onPointerDown={(e) => onMove(e.clientX)}
        onPointerLeave={() => setHover(null)}
      >
        <svg viewBox="0 0 600 220" preserveAspectRatio="none">
          <g stroke="var(--rule-soft)" strokeWidth="1" vectorEffect="non-scaling-stroke">
            <line x1="0" y1="44" x2="600" y2="44" />
            <line x1="0" y1="110" x2="600" y2="110" />
            <line x1="0" y1="176" x2="600" y2="176" />
          </g>
          <path d={area} fill="var(--accent)" fillOpacity="0.08" />
          <path
            d={line}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <line
            stroke="var(--ink-soft)"
            strokeWidth="1"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
            x1={hoverPt ? hoverPt.x : 0}
            y1="0"
            x2={hoverPt ? hoverPt.x : 0}
            y2="220"
            style={{ opacity: hoverPt ? 0.5 : 0 }}
          />
          <circle
            r="4"
            fill="var(--accent)"
            stroke="var(--bg-card)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            cx={hoverPt ? hoverPt.x : 0}
            cy={hoverPt ? hoverPt.y : 0}
            style={{ opacity: hoverPt ? 1 : 0 }}
          />
        </svg>
      </div>

      <div className="chart__axis">
        {axis.map((label, i) => (
          <span key={i}>{label}</span>
        ))}
      </div>
    </div>
  );
}
