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
    <>
      {/* Background semi-transparent dome for reference */}
      <Entity position={domePosition} name="Full Dome Outline">
        <EllipsoidGraphics
          radii={new Cartesian3(2000.0, 2000.0, 2000.0)}
          innerRadii={new Cartesian3(500.0, 500.0, 500.0)}
          minimumCone={CesiumMath.toRadians(60.0)}
          maximumCone={CesiumMath.toRadians(90.0)}
          minimumClock={0.0}
          maximumClock={Math.PI} // Full half-dome
          material={Color.YELLOW.withAlpha(0.1)} // Light yellow to keep it visible
          outline={true}
          outlineColor={Color.BLACK}
        />
      </Entity>

      {/* Sweeping animation */}
      <Entity position={domePosition} name="Radar Sweep">
        <EllipsoidGraphics
          radii={new Cartesian3(2000.0, 2000.0, 2000.0)}
          innerRadii={new Cartesian3(500.0, 500.0, 500.0)}
          minimumCone={CesiumMath.toRadians(60.0)}
          maximumCone={CesiumMath.toRadians(90.0)}
          minimumClock={sweepStart}
          maximumClock={sweepStart + sweepWidth}
          material={Color.YELLOW.withAlpha(0.3)} // More opaque for the sweep effect
          stackPartitions={128}
          slicePartitions={36}
          outline={true}
          outlineColor={Color.BLACK}
        />
      </Entity>
    </>
  );
};

export default RadarSweepEntity;
