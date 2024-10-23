import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import Test from './Test.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />       {/* Main route for App */}
        <Route path="/test" element={<Test />} />  {/* Route for Test component */}
      </Routes>
    </Router>
  </StrictMode>,
);
