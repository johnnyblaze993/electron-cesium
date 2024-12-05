//@ts-nocheck
(window as any).CESIUM_BASE_URL = './cesium';

import { useEffect, useRef, useState } from 'react';
import { useCoordinateStore } from './stores/coordinateStore';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { terrainProvider } from './cesium/cesiumConfig';
import UIControls from './components/UIControls';
import CesiumViewer from './components/CesiumViewer';
import { Cartesian3 } from 'cesium';

function App() {
  const { t } = useTranslation();
  const coordinates = useCoordinateStore((state) => state.coordinates) || [];
  const addCoordinate = useCoordinateStore((state) => state.addCoordinate);
  const navigate = useNavigate();
  const viewerRef = useRef(null);


  // Listen for updates from Electron (when new coordinates are added)
  useEffect(() => {
    if (window.electronAPI?.onCoordinatesUpdate) {
      window.electronAPI.onCoordinatesUpdate((newCoordinate) => {
        addCoordinate(newCoordinate);
      });
    } else {
      console.warn('electronAPI or onCoordinatesUpdate is not available');
    }
  }, [addCoordinate]);

 // Fly to the last added coordinate after a new one is added
  useEffect(() => {
    if (coordinates.length > 0 && viewerRef.current) {
      const lastCoordinate = coordinates[coordinates.length - 1];
      const lastPosition = Cartesian3.fromDegrees(
        parseFloat(lastCoordinate.longitude),
        parseFloat(lastCoordinate.latitude),
        1000
      );
      viewerRef.current.cesiumElement.camera.flyTo({
        destination: lastPosition,
        duration: 2,
      });
    }
  }, [coordinates]);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <UIControls />
      <CesiumViewer coordinates={coordinates} terrainProvider={terrainProvider} ref={viewerRef} />
    </div>
  );
}

export default App;
