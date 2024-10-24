import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import Test from './components/Test.tsx';
import AddCoordinate from './components/AddCoordinate.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />       {/* Main route for App */}
        <Route path="/test" element={<Test />} />  {/* Route for Test component */}
        <Route path="/add-coordinate" element={<AddCoordinate />} />  {/* Route for AddCoordinate component */}
      </Routes>
    </Router>
  </StrictMode>,
);
