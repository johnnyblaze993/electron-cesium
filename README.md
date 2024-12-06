# Run app on electron
  ## clear dist and build directories
  - npm run clean
  ## Build Electron prod:
  - npm run build (creates dist and build)
  - npm run electron:build (packages the all using dist & build)
  ## Run Electron in Development: 
  - npm run build (creates dist)
  - npm run start (opens electron app and another version in the browser)

# Run app without electron
- npm run dev (electron API does not work in this environment)

# Port
- uses port 5555 because there were so many react apps I was working on

# Ellipsoid dome code
const viewer = new Cesium.Viewer("cesiumContainer");
 
 
const maximumClockValue = 3.1415;
viewer.entities.add({
  name: "Top and bottom cut out",
  position: Cesium.Cartesian3.fromDegrees(-102.023, 40.0, 0.0),
  ellipsoid: {
    radii: new Cesium.Cartesian3(2000.0, 2000.0, 2000.0),
    innerRadii: new Cesium.Cartesian3(500,500.0, 500.0),
    minimumCone: Cesium.Math.toRadians(60.0),
    maximumCone: Cesium.Math.toRadians(90.0),
    material: Cesium.Color.YELLOW.withAlpha(0.3),
    stackPartitions: 128,
    slicePartitions: 1365,
    minimumClock: 0.0,
    maximumClock: maximumClockValue,
    outline: true,
  },
});
 
viewer.zoomTo(viewer.entities);

## Electron Setup

For details about the Electron setup and architecture, check out the [Electron README](./electron/README.md).