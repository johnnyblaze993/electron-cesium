//@ts-nocheck
import { Viewer, Entity, PointGraphics } from 'resium';
import { Cartesian3, Color, createWorldTerrainAsync } from 'cesium';
import { useEffect, useState } from 'react';

function App() {
  const [coordinates, setCoordinates] = useState([]);  // State for coordinates

  const terrainProvider = createWorldTerrainAsync();

  useEffect(() => {
    // Listen for coordinates sent from the secondary window
    window.electronAPI.onCoordinatesUpdate((newCoordinates) => {
      setCoordinates((prevCoords) => [...prevCoords, ...newCoordinates]);
      console.log('Updated Coordinates:', newCoordinates);
    });
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <button onClick={() => window.electronAPI.openTestWindow()} style={{ position: 'absolute', zIndex: 1000 }}>
        Open Test Window
      </button>

      <Viewer full terrainProvider={terrainProvider}>
        {/* Render points dynamically based on coordinates */}
        {coordinates.map((coord, index) => {
          const position = Cartesian3.fromDegrees(
            parseFloat(coord.longitude),
            parseFloat(coord.latitude),
            0
          );
          return (
            <Entity key={index} position={position} name={`Point ${index + 1}`}>
              <PointGraphics pixelSize={10} color={Color.RED} />
            </Entity>
          );
        })}
      </Viewer>
    </div>
  );
}

export default App;
