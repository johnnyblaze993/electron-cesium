//@ts-nocheck

import { Viewer, Entity, PolygonGraphics, CameraFlyTo } from 'resium';
import { Cartesian3, Color, createWorldTerrainAsync, PolygonHierarchy } from 'cesium';
import { useCoordinateStore } from './stores/coordinateStore';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import { useEffect } from 'react';

function App() {
  const coordinates = useCoordinateStore((state) => state.coordinates);  // Retrieve coordinates from Zustand store
  const setCoordinates = useCoordinateStore((state) => state.setCoordinates);  // Zustand function to set coordinates
  const navigate = useNavigate();  // Initialize navigation

  const terrainProvider = createWorldTerrainAsync();

  // Function to navigate to Test.tsx
  const openTestWindow = () => {
    window.electronAPI.openTestWindow();
  };

  // Listen for coordinates update from Test window (via ipcRenderer)
  useEffect(() => {
    window.electronAPI.onCoordinatesUpdate((newCoordinates) => {
      setCoordinates(newCoordinates);  // Update the Zustand store with new coordinates
    });
  }, [setCoordinates]);

  // Convert coordinates to Cesium's Cartesian3 for PolygonGraphics hierarchy
  const polygonPositions = coordinates.map(coord =>
    Cartesian3.fromDegrees(parseFloat(coord.longitude), parseFloat(coord.latitude), 0)  // Set height to 0
  );

  console.log('Rendering Coordinates:', coordinates);
  console.log('Polygon Positions (Cartesian3):', polygonPositions);  // Log the positions to verify

  // Adjust the camera position based on polygon center
  const firstPosition = polygonPositions.length > 0 ? polygonPositions[0] : null;

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      {/* Button to navigate to Test.tsx */}
      <button onClick={openTestWindow} style={{ position: 'absolute', zIndex: 1000 }}>
        Open Test Window
      </button>

      <Viewer full terrainProvider={terrainProvider}>
        {/* Move the camera closer to the polygon area */}
        {firstPosition && (
          <CameraFlyTo
            destination={Cartesian3.fromDegrees(
              parseFloat(coordinates[0].longitude),
              parseFloat(coordinates[0].latitude),
              10000  // Zoom in closer to the polygon (adjust this value if necessary)
            )}
            duration={3}
          />
        )}

        {/* Render polygon only if we have at least 3 valid points */}
        {polygonPositions.length >= 3 && (
          <Entity name="Polygon">
            <PolygonGraphics
              hierarchy={new PolygonHierarchy(polygonPositions)}  // Properly set the hierarchy
              material={Color.RED.withAlpha(0.5)}  // Semi-transparent red color
              height={0}  // Set polygon height to 0 to avoid terrain clamping
              perPositionHeight={false}  // Ensures all positions share the same height
              outline={true}
              outlineColor={Color.BLACK}
            />
          </Entity>
        )}
      </Viewer>
    </div>
  );
}

export default App;
