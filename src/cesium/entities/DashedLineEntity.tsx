import React from "react";
import { Entity, PolylineGraphics } from "resium";
import { Cartesian3, Color, PolylineDashMaterialProperty } from "cesium";

const birminghamDashedPoints = [
  { longitude: -86.8200, latitude: 33.5050, altitude: 200 },
  { longitude: -86.8185, latitude: 33.5068, altitude: 250 },
  { longitude: -86.8170, latitude: 33.5086, altitude: 300 },
  { longitude: -86.8155, latitude: 33.5104, altitude: 350 },
];

const DashedLineEntity: React.FC = () => {
  const positions = birminghamDashedPoints.map((point) =>
    Cartesian3.fromDegrees(point.longitude, point.latitude, point.altitude)
  );

  return (
    <Entity name="Dashed Line Connection">
      <PolylineGraphics
        positions={positions}
        material={new PolylineDashMaterialProperty({
          color: Color.MAGENTA,
          dashLength: 16, // Length of each dash
          gapColor: Color.TRANSPARENT, // Transparent gaps
        })}
        width={3}
      />
    </Entity>
  );
};

export default DashedLineEntity;
