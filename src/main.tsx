// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import Test from './components/Test.tsx';
import AddCoordinate from './components/AddCoordinate.tsx';
import NIAs from './pages/PolygonalAreas/NIAs.tsx';
import ProtectedAreas from './pages/PolygonalAreas/ProtectedAreas.tsx';
import FlightProfiles from './pages/Threats/FlightProfiles.tsx';
import ImpactAreas from './pages/Threats/ImpactAreas.tsx';
import ThreatSpecificGraphics from './pages/Threats/ThreatSpecificGraphics.tsx';
import WeaponSpecificGraphics from './pages/Weapons/WeaponSpecificPraphics.tsx';
import GeometricSolid from './pages/Sensors/SensorCoverages/GeometricSolid.tsx';
import PolarGroundCoverage from './pages/Sensors/SensorCoverages/PolarGroundCoverage.tsx';
import FOBBoundaries from './pages/PolygonalAreas/FOBBoundaries.tsx';
import AllowableAreas from './pages/PolygonalAreas/AllowableAreas.tsx';
import IgnoredRegions from './pages/PolygonalAreas/IgnoredRegions.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />  {/* Main route for App */}
        <Route path="/test" element={<Test />} />  {/* Route for Test component */}
        <Route path="/add-coordinate" element={<AddCoordinate />} />  {/* Route for AddCoordinate component */}
        
        {/* Polygonal Areas */}
        <Route path="/polygonal-areas/nias" element={<NIAs />} />  {/* Route for NIAs */}
        <Route path="/polygonal-areas/protected-areas" element={<ProtectedAreas />} />  {/* Route for Protected Areas */}
        <Route path="/polygonal-areas/fob-boundaries" element={<FOBBoundaries />} />  {/* Route for FOB Boundaries */}
        <Route path="/polygonal-areas/allowable-areas" element={<AllowableAreas />} />  {/* Route for Allowable Areas */}
        <Route path="/polygonal-areas/ignored-regions" element={<IgnoredRegions />} />  {/* Route for Ignored Regions */}
        
        {/* Threats */}
        <Route path="/threats/flight-profiles" element={<FlightProfiles />} />  {/* Route for Flight Profiles */}
        <Route path="/threats/impact-areas" element={<ImpactAreas />} />  {/* Route for Impact Areas */}
        <Route path="/threats/threat-specific-graphics" element={<ThreatSpecificGraphics />} />  {/* Route for Threat Specific Graphics */}
        
        {/* Weapons */}
        <Route path="/weapons/weapon-specific-graphics" element={<WeaponSpecificGraphics />} />  {/* Route for Weapon Specific Graphics */}
        
        {/* Sensors - Sensor Coverages */}
        <Route path="/sensors/sensor-coverages/geometric-solid" element={<GeometricSolid />} />  {/* Route for Geometric Solid */}
        <Route path="/sensors/sensor-coverages/polar-ground-coverage" element={<PolarGroundCoverage />} />  {/* Route for Polar Ground Coverage */}
      </Routes>
    </Router>
  </StrictMode>
);
