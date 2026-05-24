# Lobbymen Enterprises

A single-page marketing/IR site for **Lobbymen Enterprises**, a (fictional)
diversified Canadian holding company. Built as a React SPA with Vite and React
Router, recreating an HTML/CSS prototype handed off from
[Claude Design](https://claude.ai/design).

> Lobbymen Enterprises and its subsidiaries are fictional. Financials, tickers,
> and quotes are illustrative only.

## Pages

- **Home** (`/`) — long-scroll corporate site: hero + KPIs, an animated market
  ticker, the three subsidiaries, an Office-of-the-CEO section, investor
  relations with an interactive (Wealthsimple-style) price chart, a newsroom,
  a responsibility section, and global offices.
- **Quarterly results** (`/newsroom/quarterly-results`) — a press release.
- **Financial statements** (`/newsroom/financial-statements`) — condensed
  consolidated statements (operations, financial position, cash flows).

### Notable behaviours

- **Light / dark mode** that respects the OS preference, with a topbar toggle
  that persists the choice in `localStorage`. The mode is resolved before first
  paint by an inline script in `index.html` to avoid a flash of the wrong theme.
- **Dynamic dates** — fiscal-year and quarter labels derive from the current
  date (`new Date()`), so the site never needs a yearly edit. Genuinely static
  dates (founding years, the bot's deploy date, the Tesal photo caption, the
  historical press-release dates) are intentionally left fixed.
- **Responsive** across phone, tablet, and desktop; honours
  `prefers-reduced-motion`.

## Tech stack

- [Vite](https://vitejs.dev/) 8 (build tooling / dev server)
- [React](https://react.dev/) 19
- [React Router](https://reactrouter.com/) 7 (`HashRouter` — see *Deployment*)

## Local development

Requires Node.js ≥ 20.19 or ≥ 22.12 (Vite 8) and npm.

```bash
npm install      # install dependencies
npm run dev      # start the dev server (default: http://localhost:5173)
```

Other scripts:

```bash
npm run build    # production build into dist/
npm run preview  # serve the production build locally to verify it
```

## Project structure

```
index.html              Vite entry; pre-paint theme script + Google Fonts
src/
  main.jsx              app bootstrap (HashRouter + ThemeProvider), CSS imports
  App.jsx               route table
  context/
    ThemeContext.jsx    light/dark mode state + persistence
  components/
    Topbar.jsx          shared sticky header + nav
    ThemeToggle.jsx     sun/moon toggle button
    Breadcrumb.jsx      newsroom breadcrumb
    Ticker.jsx          GPU-animated market marquee
    StockChart.jsx      interactive SVG price chart
    SiteFooter.jsx      full footer (home)
    PageFooter.jsx      compact footer (newsroom)
    ScrollManager.jsx   scroll-to-top on route change
  pages/
    Home.jsx
    QuarterlyResults.jsx
    FinancialStatements.jsx
  lib/
    dates.js            dynamic fiscal-period labels
    scroll.js           smooth in-page scrolling + cross-page section nav
    useDocumentTitle.js per-route <title>
  styles/
    theme.css           design tokens, reset, shared chrome (topbar, etc.)
    home.css            home-page components
    newsroom.css        press-release page
    statements.css      financial-statements page
  assets/
    tesal-breadboard.jpg
```

## Deployment (GitHub Pages)

A workflow at `.github/workflows/deploy.yml` builds the site and deploys it to
GitHub Pages on every push/merge to `main` (and on manual dispatch).

One-time setup in the repository:

1. Push this project to a GitHub repository.
2. Go to **Settings → Pages** and set **Source** to **GitHub Actions**.

That's it — subsequent pushes to `main` publish automatically.

### Clean URLs on GitHub Pages

The app uses `BrowserRouter`, so routes are clean paths
(e.g. `/newsroom/quarterly-results`, no `#`). GitHub Pages serves project sites
from a subpath (`https://<user>.github.io/<repo>/`) and has no server-side
routing, which normally breaks both asset paths and deep links. Two pieces make
it work with **zero per-repo configuration**:

- **Auto-detected base path.** `vite.config.js` resolves the public base from the
  Actions environment: `/` for local dev and user/org (`<owner>.github.io`)
  sites, `/<repo>/` for project sites. `BrowserRouter`'s `basename` is wired to
  the same value via `import.meta.env.BASE_URL`. Set the `VITE_BASE` env var to
  override (e.g. a custom domain on a project repo).
- **SPA fallback.** The build copies `index.html` to `dist/404.html`. GitHub
  Pages serves `404.html` for any unknown path, so visiting or refreshing a deep
  link loads the SPA, which then renders the right route. (GitHub returns it with
  a 404 status code, which browsers ignore but some crawlers may note.)

## Credits

Design prototype produced in Claude Design; implemented as a React app.
