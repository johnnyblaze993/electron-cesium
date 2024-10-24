import { Viewer, Entity, EntityDescription, GeoJsonDataSource } from 'resium';
import { Cartesian3, Color, createWorldTerrainAsync } from 'cesium';

function App() {
  const openTestWindow = () => {
    window.electronAPI.openTestWindow();  // Access the exposed API
  };

  // Create the terrain provider for 3D terrain
  const terrainProvider = createWorldTerrainAsync();

  // Example entity's position and properties
  const position = Cartesian3.fromDegrees(-86.5861, 34.7304, 0);  // Longitude, Latitude, Height
  const pointGraphics = { pixelSize: 10, color: Color.RED };  // Red point

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <button onClick={openTestWindow} style={{ position: 'absolute', zIndex: 1000 }}>
        Open Test Window
      </button>
      
      <Viewer full terrainProvider={terrainProvider}>
        {/* Example entity: a red point on the globe */}
        <Entity
          position={position}  // Longitude, Latitude
          name="Red point"
          point={pointGraphics}  // Red point
        >
          <EntityDescription>
            <h1>Hello, world.</h1>
            <p>This is a red point on the globe.</p>
          </EntityDescription>
        </Entity>

        {/* Load the Huntsville GeoJSON from src/assets/huntsville.geojson */}
        <GeoJsonDataSource
          data="/src/assets/huntsville.geojson"
          clampToGround={true}  // Make sure the data sticks to the terrain
        />
      </Viewer>
    </div>
  );
}

export default App;
