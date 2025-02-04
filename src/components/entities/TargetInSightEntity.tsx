// @ts-nocheck
// TargetInSightEntity.tsx
import React, { useEffect, useState } from "react";
import { Entity, EllipsoidGraphics, useCesium } from "resium";
import { Cartesian3, Cartographic, Color, Math as CesiumMath, JulianDate } from "cesium";

const DOME_POSITION = Cartesian3.fromDegrees(-86.7816, 36.1627, 0); // Nashville, TN
const DOME_RADIUS = 500; // Radius in meters

const TargetInSightEntity: React.FC = () => {
  const { viewer } = useCesium(); // Get Cesium viewer
  const [position, setPosition] = useState(
    Cartesian3.fromDegrees(-86.7822, 36.1627, 2000) // Start slightly left of the dome
  );
  const [dynamicColor, setDynamicColor] = useState(Color.GREEN);
  const [direction, setDirection] = useState(1); // 1 = moving right, -1 = moving left

  useEffect(() => {
    if (!viewer) return;

    viewer.clock.shouldAnimate = true; // Ensure time is running
    viewer.clock.multiplier = 5; // Default speed (can be changed in UI)

    const interval = setInterval(() => {
      const currentTime = viewer.clock.currentTime;
      const elapsedSeconds = JulianDate.secondsDifference(currentTime, viewer.clock.startTime);
      const speedFactor = viewer.clock.multiplier * 0.00002; // Adjust speed dynamically

      setPosition((prevPos) => {
        const carto = Cartographic.fromCartesian(prevPos);
        let newLongitude = CesiumMath.toDegrees(carto.longitude) + direction * speedFactor;

        // ✅ Reverse direction if hitting boundaries (-86.7822 to -86.7810)
        if (newLongitude >= -86.7810 || newLongitude <= -86.7822) {
          setDirection((prevDirection) => -prevDirection); // Swap direction
          newLongitude = CesiumMath.toDegrees(carto.longitude) + direction * speedFactor; // Apply new direction
        }

        const newPos = Cartesian3.fromDegrees(newLongitude, 36.1627, 2000);

        // ✅ Update color based on distance from dome
        const distance = Cartesian3.distance(DOME_POSITION, newPos);
        if (distance > DOME_RADIUS * 3) {
          setDynamicColor(Color.BLUEVIOLET);
        } else if (distance > DOME_RADIUS * 1.5) {
          setDynamicColor(Color.YELLOW);
        } else {
          setDynamicColor(Color.RED);
        }

        return newPos;
      });
    }, 100); // Update every 0.1 seconds

    return () => clearInterval(interval);
  }, [viewer]);

  return (
    <Entity name="Target in Sight" position={position}>
      {/* Floating Orb */}
      <EllipsoidGraphics
        radii={new Cartesian3(900, 900, 900)} // Large orb (1800m diameter)
        material={dynamicColor.withAlpha(0.8)} // Glowing effect
      />
    </Entity>
  );
};

export default TargetInSightEntity;
