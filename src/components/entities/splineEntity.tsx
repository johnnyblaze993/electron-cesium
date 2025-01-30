// SplineEntity.tsx
import React, { useMemo } from "react";
import { Entity, PolylineGraphics } from "resium";
import { CatmullRomSpline, Cartesian3, Color } from "cesium";
import { huntsvillePoints } from "../../huntsvillePoints";

const SplineEntity: React.FC = () => {
  const lineSegments = useMemo(() => {
    // Filter points that are visible
    const visiblePoints = huntsvillePoints.filter((point) => point.visible);

    // Convert visible points to Cartesian3
    const cartesianPoints = visiblePoints.map((point) =>
      Cartesian3.fromDegrees(point.longitude, point.latitude, point.altitude)
    );

    // Create line segments with colors based on acquired state
    const segments = [];
    for (let i = 0; i < cartesianPoints.length - 1; i++) {
      segments.push({
        start: cartesianPoints[i],
        end: cartesianPoints[i + 1],
        color: visiblePoints[i].acquired ? Color.GREEN : Color.RED, // Green for acquired, Red otherwise
      });
    }

    return segments;
  }, []);

  return (
    <>
      {lineSegments.map((segment, index) => (
        <Entity key={index}>
          <PolylineGraphics
            positions={[segment.start, segment.end]} // Line segment start and end
            material={segment.color} // Color based on acquired state
            width={5}
          />
        </Entity>
      ))}
    </>
  );
};

export default SplineEntity;
