// RadarSweepEntity.tsx
import React from "react";
import { Entity, EllipsoidGraphics } from "resium";
import { Cartesian3, Color, Math as CesiumMath } from "cesium";

const RadarSweepEntity: React.FC = () => {
  const domePosition = Cartesian3.fromDegrees(-86.5861, 34.8204, 0); // Downtown Huntsville

  return (
    <Entity position={domePosition} name="Ellipsoid Dome">
      <EllipsoidGraphics
        radii={new Cartesian3(2000.0, 2000.0, 2000.0)} // Outer radii
        innerRadii={new Cartesian3(500.0, 500.0, 500.0)} // Inner radii (hollow center)
        minimumCone={CesiumMath.toRadians(60.0)} // Bottom cutoff
        maximumCone={CesiumMath.toRadians(90.0)} // Top cutoff
        minimumClock={0.0} // Full coverage around
        maximumClock={3.1415} // Semi-circle
        material={Color.YELLOW.withAlpha(0.3)} // Semi-transparent yellow
        stackPartitions={128} // Vertical slices
        slicePartitions={36} // Horizontal slices (lower value for performance)
        outline={true} // Show outline
        outlineColor={Color.BLACK} // Black outline
      />
    </Entity>
  );
};

export default RadarSweepEntity;
