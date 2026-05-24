import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

import './styles/theme.css';
import './styles/home.css';
import './styles/newsroom.css';
import './styles/statements.css';
import './styles/whistleblower.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      {/* basename = Vite's base path, so routes are correct whether the site is
          served from the domain root or a /<repo>/ subpath on GitHub Pages. */}
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
