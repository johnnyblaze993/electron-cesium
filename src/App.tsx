
(window as any).CESIUM_BASE_URL = './cesium';

import { useEffect, useRef, useState } from 'react';
import { useCoordinateStore } from './stores/coordinateStore';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { terrainProvider } from './cesium/config/cesiumConfig';
import UIControls from './components/UIControls';
import CesiumViewer from './cesium/CesiumViewer';
import { Cartesian3 } from 'cesium';
import { Viewer } from 'cesium';
import React from 'react';

const TILESETS = {
  googleTiles: 2275207,
  osmBuildings: 96188, //does not work
};
  
function App() {
  const { t } = useTranslation();
  const coordinates = useCoordinateStore((state) => state.coordinates) || [];
  const addCoordinate = useCoordinateStore((state) => state.addCoordinate);
  const removeCoordinate = useCoordinateStore((state) => state.removeCoordinate);
  const navigate = useNavigate();
  const viewerRef = useRef<{ cesiumElement: Viewer | null }>({ cesiumElement: null });
  const [activeTilesetId, setActiveTilesetId] = useState<number | null>(TILESETS.googleTiles);


  // Listen for updates from Electron (when new coordinates are added)
  useEffect(() => {
        //@ts-ignore
    if (window.electronAPI?.onCoordinatesUpdate) {
          //@ts-ignore
      window.electronAPI.onCoordinatesUpdate((newCoordinate) => {
        addCoordinate(newCoordinate);
      });
    } else {
      console.warn('electronAPI or onCoordinatesUpdate is not available');
    }
      //@ts-ignore
    if (window.electronAPI?.onCoordinateDeleted) {
          //@ts-ignore
      window.electronAPI.onCoordinateDeleted((index: number) => {
        // Update the state to remove the coordinate
        removeCoordinate(index);
      });
    }
  }, [addCoordinate, removeCoordinate]);

 // Fly to the last added coordinate after a new one is added
 useEffect(() => {
  // Ensure the Cesium viewer is initialized
  if (viewerRef.current && viewerRef.current.cesiumElement) {
    const viewer = viewerRef.current.cesiumElement;

    if (coordinates.length > 0) {
      // Fly to the last coordinate
      const lastCoordinate = coordinates[coordinates.length - 1];
      const lastPosition = Cartesian3.fromDegrees(
        parseFloat(lastCoordinate.longitude),
        parseFloat(lastCoordinate.latitude),
        1000
      );
      viewer.camera.flyTo({
        destination: lastPosition,
        duration: 2,
      });
    } else {
      // If no coordinates, reset the view to the default world view
      viewer.camera.flyTo({
        destination: Cartesian3.fromDegrees(0, 0, 20000000), // Default to zoom out to the whole Earth
        duration: 2,
      });
    }
  }
}, [coordinates]);

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <UIControls />
      <div style={{ position: "absolute", top: "50px", left: "10px", zIndex: 100, background: "white", padding: "5px", borderRadius: "5px" }}>
        <label style={{ marginRight: "5px" }}>Select Tileset:</label>
        <select onChange={(e) => setActiveTilesetId(Number(e.target.value))} style={{ fontSize: "14px", padding: "5px" }}>
          <option value={TILESETS.googleTiles}>Google 3D Tiles</option>
          <option value={TILESETS.osmBuildings}>Cesium OSM Buildings</option>
        </select>
      </div>
      <CesiumViewer terrainProvider={terrainProvider} activeTilesetId={activeTilesetId} 
      coordinates={coordinates} ref={viewerRef} />
    </div>
  );
}

export default App;
