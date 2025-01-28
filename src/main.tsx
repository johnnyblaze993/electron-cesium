// src/main.tsx
//@ts-nocheck
import React, { useEffect } from "react";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import App from "./App.tsx";
import Test from "./components/TestPage/Test.tsx";
import TestSimulations from "./components/TestPage/TestSimulations.tsx";
import MenuTreeParameterGroups from "./components/MenuTreeParameterGroups.tsx";
import AddCoordinate from "./components/AddCoordinate.tsx";
import NIAs from "./pages/PolygonalAreas/NIAs.tsx";
import ProtectedAreas from "./pages/PolygonalAreas/ProtectedAreas.tsx";
import FlightProfiles from "./pages/Threats/FlightProfiles.tsx";
import ImpactAreas from "./pages/Threats/ImpactAreas.tsx";
import ThreatSpecificGraphics from "./pages/Threats/ThreatSpecificGraphics.tsx";
import WeaponSpecificGraphics from "./pages/Weapons/WeaponSpecificGraphics.tsx";
import GeometricSolid from "./pages/Sensors/SensorCoverages/GeometricSolid.tsx";
import PolarGroundCoverage from "./pages/Sensors/SensorCoverages/PolarGroundCoverage.tsx";
import FOBBoundaries from "./pages/PolygonalAreas/FOBBoundaries.tsx";
import AllowableAreas from "./pages/PolygonalAreas/AllowableAreas.tsx";
import IgnoredRegions from "./pages/PolygonalAreas/IgnoredRegions.tsx";
import "./i18n";
import "./index.css";

const Main = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Listen for language updates from Electron
    const handleLanguageUpdate = (language: string) => {
      i18n.changeLanguage(language); // Update the i18n language dynamically
    };

    if (window.electronAPI?.onLanguageUpdate) {
      window.electronAPI.onLanguageUpdate(handleLanguageUpdate);
    }

    return () => {
      // Clean up listener on unmount
      if (window.electronAPI?.onLanguageUpdate) {
        window.electronAPI.onLanguageUpdate(() => {});
      }
    };
  }, [i18n]);

  return (
    <Suspense fallback="loading...">
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/test" element={<Test />} />
          <Route path="/test-simulations" element={<TestSimulations />} />
          <Route path="/menu-tree-parameter-groups" element={<MenuTreeParameterGroups />} />
          <Route path="/add-coordinate" element={<AddCoordinate />} />
          <Route path="/polygonal-areas/nias" element={<NIAs />} />
          <Route path="/polygonal-areas/protected-areas" element={<ProtectedAreas />} />
          <Route path="/polygonal-areas/fob-boundaries" element={<FOBBoundaries />} />
          <Route path="/polygonal-areas/allowable-areas" element={<AllowableAreas />} />
          <Route path="/polygonal-areas/ignored-regions" element={<IgnoredRegions />} />
          <Route path="/threats/flight-profiles" element={<FlightProfiles />} />
          <Route path="/threats/impact-areas" element={<ImpactAreas />} />
          <Route path="/threats/threat-specific-graphics" element={<ThreatSpecificGraphics />} />
          <Route path="/weapons/weapon-specific-graphics" element={<WeaponSpecificGraphics />} />
          <Route path="/sensors/sensor-coverages/geometric-solid" element={<GeometricSolid />} />
          <Route path="/sensors/sensor-coverages/polar-ground-coverage" element={<PolarGroundCoverage />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
