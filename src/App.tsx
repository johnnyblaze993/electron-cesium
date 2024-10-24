import { Viewer, Entity } from 'resium';
import { Cartesian3, Color } from 'cesium';



function App() {

  const openTestWindow = () => {
    window.electronAPI.openTestWindow();  // Access the exposed API
  };

  const position = Cartesian3.fromDegrees(-75.59777, 40.03883, 10);  // Longitude, Latitude, Height
  const pointGraphics = { pixelSize: 10, color: Color.RED };  // Red point

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <button onClick={openTestWindow} style={{ position: 'absolute', zIndex: 1000 }}>
        Open Test Window
      </button>
      <Viewer full>
        {/* Example entity: a red point on the globe */}
        <Entity
          position={position}  // Longitude, Latitude
          name='Red point'
          description={'Hello, world!'}
          point={pointGraphics}  // Red point
        />
      </Viewer>
    </div>
  );
}

export default App;
