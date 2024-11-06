//@ts-nocheck
(window as any).CESIUM_BASE_URL = './cesium';


import { Viewer, Entity, PolygonGraphics, PointGraphics, Cesium3DTileset } from 'resium';
import { Cartesian3, Color, createWorldTerrainAsync, PolygonHierarchy, Ion, createOsmBuildingsAsync, Cesium3DTileStyle, IonResource } from 'cesium';
import { useCoordinateStore } from './stores/coordinateStore';
import { useNavigate } from 'react-router-dom';  
import { useEffect, useRef } from 'react';

// Set your Cesium Ion Access Token
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2M2I0NDlhNi0xM2ZmLTQzODEtOWQ3OC03OTg3NDU3MTBlODUiLCJpZCI6MjUwNTMwLCJpYXQiOjE3Mjk3NzgzNzR9.kb003ews9fyouXCJthtNxLDIYMukHobYM60UOiv5FpI';

function App() {
  const coordinates = useCoordinateStore((state) => state.coordinates) || [];
  const addCoordinate = useCoordinateStore((state) => state.addCoordinate);
  const navigate = useNavigate();
  const viewerRef = useRef(null);

  // Load the terrain provider
  const terrainProvider = createWorldTerrainAsync();

  // Load OSM Buildings asynchronously
  useEffect(() => {
    const loadOsmBuildings = async () => {
      try {
        const osmBuildings = await createOsmBuildingsAsync({
          style: new Cesium3DTileStyle({
            // color: {
            //   conditions: [
            //     ["${feature['building']} === 'hospital'", "color('#0000FF')"],
            //     ["${feature['building']} === 'school'", "color('#00FF00')"],
            //     [true, "color('#ffffff')"]
            //   ]
            // }
          }),
          showOutline: true,
        });
        
        // Add to the scene once loaded
        if (viewerRef.current?.cesiumElement) {
          viewerRef.current.cesiumElement.scene.primitives.add(osmBuildings);
        }
      } catch (error) {
        console.error("Error loading OSM buildings:", error);
      }
    };
    
    loadOsmBuildings();
  }, []);

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

  // Convert coordinates to Cesium's Cartesian3 for PolygonGraphics
  const polygonPositions = Array.isArray(coordinates)
    ? coordinates.map((coord) => Cartesian3.fromDegrees(parseFloat(coord.longitude), parseFloat(coord.latitude), 0))
    : [];

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      {/* Button to navigate to Test.tsx */}
      <button
        onClick={() => {
          if (window.electronAPI?.openTestWindow) {
            window.electronAPI.openTestWindow();
          } else {
            console.warn("electronAPI or openTestWindow is not available");
          }
        }}
        style={{ position: 'absolute', zIndex: 1000 }}
      >
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
              hierarchy={new PolygonHierarchy(polygonPositions)}
              material={Color.RED.withAlpha(0.5)}
              outline={false}
            />
          </Entity>
        )}
      </Viewer>
    </div>
  );
}

export default App;
