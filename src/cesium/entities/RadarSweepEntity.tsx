// RadarSweepEntity.tsx
import React, { useState, useEffect } from "react";
import { Entity, EllipsoidGraphics } from "resium";
import { Cartesian3, Color, Math as CesiumMath } from "cesium";

const RadarSweepEntity: React.FC = () => {
  const domePosition = Cartesian3.fromDegrees(-86.5861, 34.8204, 0); // Downtown Huntsville

  const [sweepStart, setSweepStart] = useState(0);
  const sweepWidth = CesiumMath.toRadians(10); // Width of the sweep area
  const sweepSpeed = CesiumMath.toRadians(1); // Speed per frame

  useEffect(() => {
    const interval = setInterval(() => {
      setSweepStart((prev) => {
        const newStart = prev + sweepSpeed;
        return newStart > Math.PI ? 0 : newStart; // Reset when reaching the rightmost limit
      });
    }, 100); // Adjust timing for smooth animation

    return () => clearInterval(interval);
  }, []);

  return (
    <Entity position={domePosition} name="Radar Sweep">
      <EllipsoidGraphics
        radii={new Cartesian3(2000.0, 2000.0, 2000.0)} // Outer radii
        innerRadii={new Cartesian3(500.0, 500.0, 500.0)} // Inner radii (hollow center)
        minimumCone={CesiumMath.toRadians(60.0)} // Bottom cutoff
        maximumCone={CesiumMath.toRadians(90.0)} // Top cutoff
        minimumClock={sweepStart} // Dynamic start position
        maximumClock={sweepStart + sweepWidth} // Dynamic end position
        material={Color.YELLOW.withAlpha(0.3)} // Semi-transparent yellow
        stackPartitions={128} // Vertical slices
        slicePartitions={36} // Horizontal slices
        outline={true} // Show outline
        outlineColor={Color.BLACK} // Black outline
      />
    </Entity>
  );
};

export default RadarSweepEntity;
