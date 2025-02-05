// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Entity, EllipsoidGraphics, useCesium } from "resium";
import { Cartesian3, Cartographic, Color, Math as CesiumMath, JulianDate } from "cesium";

const DOME_POSITION = Cartesian3.fromDegrees(-86.7816, 36.1627, 0); // Nashville, TN
const DOME_RADIUS = 500; // Radius in meters

const TargetInSightEntity: React.FC = () => {
  const { viewer } = useCesium();
  const [position, setPosition] = useState(
    Cartesian3.fromDegrees(-86.7840, 36.1627, 2000) // Start far left of dome
  );
  const [orbColor, setOrbColor] = useState(Color.WHITE); // Start white
  const [direction, setDirection] = useState(1); // Moving right
  const [colorKey, setColorKey] = useState(0); // 🔑 Force re-render on color change

  useEffect(() => {
    if (!viewer) return;

    viewer.clock.shouldAnimate = true;
    viewer.clock.multiplier = 5; // Simulation speed

    const interval = setInterval(() => {
      const speedFactor = viewer.clock.multiplier * 0.00002; // Adjust speed

      setPosition((prevPos) => {
        const carto = Cartographic.fromCartesian(prevPos);
        let newLongitude = CesiumMath.toDegrees(carto.longitude) + direction * speedFactor;

        // Stop movement when reaching the dome
        if (newLongitude >= -86.7816) {
          setDirection(0); // Stop at the dome
        }

        const newPos = Cartesian3.fromDegrees(newLongitude, 36.1627, 2000);

        // ✅ Change orb color based on distance from dome
        const distance = Cartesian3.distance(DOME_POSITION, newPos);
        let newColor = Color.WHITE; // Default

        if (distance > DOME_RADIUS * 3) {
          newColor = Color.WHITE; // Far away
        } else if (distance > DOME_RADIUS * 1.5) {
          newColor = Color.YELLOW; // Getting closer
        } else {
          newColor = Color.RED; // Right overhead
        }

        // ✅ Ensure React detects color change
        setOrbColor((prevColor) => {
          if (!prevColor.equals(newColor)) {
            setColorKey((prevKey) => prevKey + 1); // 🔑 Trigger re-render
            return newColor;
          }
          return prevColor;
        });

        return newPos;
      });
    }, 100); // Update every 0.1 seconds

    return () => clearInterval(interval);
  }, [viewer]);

  return (
    <Entity name="Orb" position={position}>
      <EllipsoidGraphics
        key={colorKey} // 🔑 Force re-render when color changes
        radii={new Cartesian3(900, 900, 900)}
        material={orbColor.withAlpha(0.8)}
      />
    </Entity>
  );
};

export default TargetInSightEntity;
