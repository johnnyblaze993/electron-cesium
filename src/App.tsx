//@ts-nocheck

import { Viewer, Entity, PolygonGraphics, PointGraphics } from 'resium';
import { Cartesian3, Color, createWorldTerrainAsync, PolygonHierarchy, Ion } from 'cesium';
import { useCoordinateStore } from './stores/coordinateStore';
import { useNavigate } from 'react-router-dom';  
import { useEffect, useRef } from 'react';

// Set your Cesium Ion Access Token
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2M2I0NDlhNi0xM2ZmLTQzODEtOWQ3OC03OTg3NDU3MTBlODUiLCJpZCI6MjUwNTMwLCJpYXQiOjE3Mjk3NzgzNzR9.kb003ews9fyouXCJthtNxLDIYMukHobYM60UOiv5FpI';

function App() {
  const coordinates = useCoordinateStore((state) => state.coordinates) || [];  // Get coordinates from Zustand store, default to empty array
  const addCoordinate = useCoordinateStore((state) => state.addCoordinate);  // Zustand function to add coordinate
  const navigate = useNavigate();  // Initialize navigation
  const viewerRef = useRef(null);  // Reference to the Cesium Viewer

  const terrainProvider = createWorldTerrainAsync();

  // Listen for updates from Electron (when new coordinates are added)
  useEffect(() => {
    window.electronAPI.onCoordinatesUpdate((newCoordinate) => {
      addCoordinate(newCoordinate);  // Add the new coordinate to Zustand store
    });
  }, [addCoordinate]);

  // Fly to the last added coordinate after a new one is added
  useEffect(() => {
    if (coordinates.length > 0 && viewerRef.current) {
      const lastCoordinate = coordinates[coordinates.length - 1];
      const lastPosition = Cartesian3.fromDegrees(
        parseFloat(lastCoordinate.longitude),
        parseFloat(lastCoordinate.latitude),
        1000  // Set altitude to make sure it is visible
      );
      viewerRef.current.cesiumElement.camera.flyTo({
        destination: lastPosition,
        duration: 2,  // Smooth transition
      });
    }
  }, [coordinates]);

  // Convert coordinates to Cesium's Cartesian3 for PolygonGraphics
  const polygonPositions = Array.isArray(coordinates)
    ? coordinates.map((coord) => Cartesian3.fromDegrees(parseFloat(coord.longitude), parseFloat(coord.latitude), 0))
    : [];

  console.log('Current Coordinates:', coordinates);
  console.log('Polygon Positions:', polygonPositions);

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      {/* Button to navigate to Test.tsx */}
      <button onClick={() => window.electronAPI.openTestWindow()} style={{ position: 'absolute', zIndex: 1000 }}>
        Open Test Window
      </button>

      <Viewer full terrainProvider={terrainProvider} ref={viewerRef}>
        {/* Plot points dynamically */}
        {polygonPositions.map((position, index) => (
          <Entity key={index} position={position}>
            <PointGraphics pixelSize={10} color={Color.RED} />
          </Entity>
        ))}

        {/* Draw polygon if we have at least 3 points */}
        {polygonPositions.length >= 3 && (
          <Entity name="Polygon">
            <PolygonGraphics
              hierarchy={new PolygonHierarchy(polygonPositions)}  // Use the positions to create a polygon
              material={Color.RED.withAlpha(0.5)}  // Semi-transparent red
              outline={false}
              outlineColor={Color.BLACK}
            />
          </Entity>
        )}
      </Viewer>
    </div>
  );
}

export default App;
