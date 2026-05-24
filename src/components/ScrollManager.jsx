import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Reset scroll to the top on route changes — except when navigating to a home
// section (handled by the Home page reading location.state.section).
export default function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    if (!location.state?.section) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.state]);
  return null;
}
