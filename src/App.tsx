import { Viewer, Entity } from 'resium';
import { Cartesian3, Color } from 'cesium';

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <Viewer full>
        {/* Example entity: a red point on the globe */}
        <Entity
          position={Cartesian3.fromDegrees(-75.59777, 40.03883)}  // Longitude, Latitude
          point={{ pixelSize: 10, color: Color.RED }}  // Red point
        />
      </Viewer>
    </div>
  );
}

export default App;
