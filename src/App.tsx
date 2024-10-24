import { Viewer, Entity, EntityDescription,  } from 'resium';
import { Cartesian3, Color, createWorldTerrainAsync } from 'cesium';



function App() {

  const openTestWindow = () => {
    window.electronAPI.openTestWindow();  // Access the exposed API
  };

  const terrainProvider = createWorldTerrainAsync();
  const position = Cartesian3.fromDegrees(-86.5861, 34.7304, 0);  // Longitude, Latitude, Height
  const pointGraphics = { pixelSize: 10, color: Color.RED };  // Red point

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <button onClick={openTestWindow} style={{ position: 'absolute', zIndex: 1000 }}>
        Open Test Window
      </button>
      <Viewer
        full
        //@ts-ignore
        terrainProvider={terrainProvider}
        >
        {/* Example entity: a red point on the globe */}
        <Entity
          position={position}  // Longitude, Latitude
          name='Red point'
          point={pointGraphics}  // Red point
        >
          <EntityDescription>
            <h1>Hello, world.</h1>
            <p>This is a red point on the globe.</p>
          </EntityDescription>

        </Entity>
      </Viewer>
    </div>
  );
}

export default App;


