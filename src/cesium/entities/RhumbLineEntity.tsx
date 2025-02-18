import React from "react";
import { Entity, PolylineGraphics } from "resium";
import { Cartesian3, Color, EllipsoidGeodesic, Cartographic } from "cesium";

const birminghamRhumbPoints = [
  { longitude: -86.8100, latitude: 33.5110, altitude: 200 },
  { longitude: -86.8085, latitude: 33.5128, altitude: 250 },
  { longitude: -86.8070, latitude: 33.5146, altitude: 300 },
  { longitude: -86.8055, latitude: 33.5164, altitude: 350 },
];

const computeRhumbLine = (start: Cartesian3, end: Cartesian3, numPoints = 50) => {
  const startCartographic = Cartographic.fromCartesian(start);
  const endCartographic = Cartographic.fromCartesian(end);
  const geodesic = new EllipsoidGeodesic(startCartographic, endCartographic);
  
  const positions: Cartesian3[] = [];
  for (let i = 0; i <= numPoints; i++) {
    const fraction = i / numPoints;
    const interpolatedCartographic = geodesic.interpolateUsingFraction(fraction);
    const position = Cartesian3.fromRadians(
      interpolatedCartographic.longitude,
      interpolatedCartographic.latitude,
      (startCartographic.height + endCartographic.height) / 2
    );
    positions.push(position);
  }

  return positions;
};

const RhumbLineEntity: React.FC = () => {
  const positions: Cartesian3[] = [];
  
  for (let i = 0; i < birminghamRhumbPoints.length - 1; i++) {
    const start = Cartesian3.fromDegrees(
      birminghamRhumbPoints[i].longitude,
      birminghamRhumbPoints[i].latitude,
      birminghamRhumbPoints[i].altitude
    );
    const end = Cartesian3.fromDegrees(
      birminghamRhumbPoints[i + 1].longitude,
      birminghamRhumbPoints[i + 1].latitude,
      birminghamRhumbPoints[i + 1].altitude
    );
    positions.push(...computeRhumbLine(start, end));
  }

  return (
    <Entity name="Rhumb Line Connection">
      <PolylineGraphics
        positions={positions}
        material={Color.CYAN}
        width={5}
      />
    </Entity>
  );
};

export default RhumbLineEntity;