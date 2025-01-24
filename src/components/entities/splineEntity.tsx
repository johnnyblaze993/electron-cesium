
// @ts-nocheck
// SplineEntity.tsx
import React, { useMemo } from "react";
import { Entity, PointGraphics, PolylineGraphics } from "resium";
import { CatmullRomSpline, Cartesian3, Color } from "cesium";
import { huntsvillePoints } from "../../huntsvillePoints";

const SplineEntity: React.FC = () => {
  const { splinePositions, cartesianPoints } = useMemo(() => {
    // Convert points to Cartesian3
    const cartesianPoints = huntsvillePoints.map((point) =>
      Cartesian3.fromDegrees(point.longitude, point.latitude, point.altitude)
    );

    // Generate times array as a sequence of incremental numbers
    const times = cartesianPoints.map((_, index) => index);

    // Create the Catmull-Rom spline
    const spline = new CatmullRomSpline({
      times, // Incremental times
      points: cartesianPoints,
    });

    // Generate positions along the entire spline
    const splinePositions = [];
    const numSamples = 200; // More samples for smoother rendering

    for (let i = 0; i <= numSamples; i++) {
      const t = (i / numSamples) * (times[times.length - 1] - times[0]); // Scale t to fit times
      splinePositions.push(spline.evaluate(t));
    }

    return { splinePositions, cartesianPoints };
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

      {/* Render points as markers */}
      {cartesianPoints.map((position, index) => (
        <Entity
          key={index}
          position={position}
          name={`Point ${index + 1}`}
        >
          <PointGraphics
            pixelSize={12}
            color={Color.RED} // Distinct red points
            outlineColor={Color.WHITE}
            outlineWidth={2}
          />
        </Entity>
      ))}
    </>
  );
};

export default SplineEntity;
