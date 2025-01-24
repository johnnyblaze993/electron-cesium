
// @ts-nocheck
// SplineEntity.tsx
import React, { useMemo } from "react";
import { Entity, PointGraphics, PolylineGraphics } from "resium";
import { CatmullRomSpline, Cartesian3, Color } from "cesium";
import { huntsvillePoints } from "../../huntsvillePoints";

const SplineEntity: React.FC = () => {
  const { splinePositions, visiblePoints } = useMemo(() => {
    // Filter points that are visible
    const visiblePoints = huntsvillePoints.filter((point) => point.visible);

    // Convert visible points to Cartesian3
    const cartesianPoints = visiblePoints.map((point) =>
      Cartesian3.fromDegrees(point.longitude, point.latitude, point.altitude)
    );

    // Generate times array
    const times = cartesianPoints.map((_, index) => index);

    // Create Catmull-Rom spline
    const spline = new CatmullRomSpline({
      times,
      points: cartesianPoints,
    });

    // Generate positions along the spline
    const splinePositions = [];
    const numSamples = 200; // Smoother spline

    for (let i = 0; i <= numSamples; i++) {
      const t = (i / numSamples) * (times[times.length - 1] - times[0]);
      splinePositions.push(spline.evaluate(t));
    }

    return { splinePositions, visiblePoints };
  }, []);

  return (
    <>
      {/* Render the spline */}
      <Entity>
        <PolylineGraphics
          positions={splinePositions}
          material={Color.YELLOW}
          width={5}
        />
      </Entity>

      {/* Render visible points */}
      {visiblePoints.map((point, index) => (
        <Entity
          key={index}
          position={Cartesian3.fromDegrees(point.longitude, point.latitude, point.altitude)}
          name={`Point ${index + 1}`}
        >
          <PointGraphics
            pixelSize={12}
            color={point.acquired ? Color.GREEN : Color.RED} // Green for acquired, red otherwise
            outlineColor={Color.WHITE}
            outlineWidth={2}
          />
        </Entity>
      ))}
    </>
  );
};

export default SplineEntity;
