import React from "react";

import { Entity, PolygonGraphics } from "resium";
import { Color, Cartesian3, PolygonHierarchy } from "cesium";

interface PolygonEntityProps {
  coordinates: Array<{ latitude: string; longitude: string }>;
}

const PolygonEntity = ({ coordinates }: PolygonEntityProps) => {
  const polygonPositions = coordinates.map((coord) =>
    Cartesian3.fromDegrees(parseFloat(coord.longitude), parseFloat(coord.latitude), 0)
  );

  return (
    <>
      {polygonPositions.length >= 3 && (
        <Entity name="Polygon">
          <PolygonGraphics
            hierarchy={new PolygonHierarchy(polygonPositions)}
            material={Color.RED.withAlpha(0.5)}
            outline={false}
          />
        </Entity>
      )}
    </>
  );
};

export default PolygonEntity;
