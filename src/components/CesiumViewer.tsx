import React from 'react';
import { Viewer, Entity, PolygonGraphics, PointGraphics } from 'resium';
import { Cartesian3, Color, PolygonHierarchy } from 'cesium';
import { ForwardedRef, forwardRef } from 'react';

interface CesiumViewerProps {
  coordinates: Array<{ latitude: string; longitude: string }>;
  terrainProvider: Promise<any>;
}

const CesiumViewer = forwardRef(
  ({ coordinates, terrainProvider }: CesiumViewerProps, ref: ForwardedRef<any>) => {
    const polygonPositions = coordinates.map((coord) =>
      Cartesian3.fromDegrees(parseFloat(coord.longitude), parseFloat(coord.latitude), 0)
    );

    return (
      <Viewer full terrainProvider={terrainProvider} ref={ref}>
        {polygonPositions.map((position, index) => (
          <Entity key={index} position={position}>
            <PointGraphics pixelSize={10} color={Color.RED} />
          </Entity>
        ))}
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
    );
  }
);

export default CesiumViewer;
