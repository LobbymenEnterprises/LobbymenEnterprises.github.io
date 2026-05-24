import { Routes, Route, Navigate } from 'react-router-dom';
import ScrollManager from './components/ScrollManager.jsx';
import Home from './pages/Home.jsx';
import QuarterlyResults from './pages/QuarterlyResults.jsx';
import FinancialStatements from './pages/FinancialStatements.jsx';

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newsroom/quarterly-results" element={<QuarterlyResults />} />
        <Route path="/newsroom/financial-statements" element={<FinancialStatements />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
