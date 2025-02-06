// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Entity, EllipsoidGraphics, useCesium } from "resium";
import { Cartesian3, Cartographic, Color, Math as CesiumMath, JulianDate } from "cesium";

const DOME_POSITION = Cartesian3.fromDegrees(-86.7816, 36.1627, 0); // Nashville Dome
const DOME_RADIUS = 9000; // Radius in meters (matches dome entity)

const TargetInSightEntity: React.FC = () => {
  const { viewer } = useCesium();
  const [position, setPosition] = useState(
    Cartesian3.fromDegrees(-86.79, 36.1627, 2000) // Start slightly left of the dome
  );
  const [orbColor, setOrbColor] = useState(Color.WHITE);
  const [colorKey, setColorKey] = useState(0); // 🔑 Force re-render on color change

  useEffect(() => {
    if (!viewer) return;

    viewer.clock.shouldAnimate = true;
    viewer.clock.multiplier = 5; // Cesium time controls speed

    const interval = setInterval(() => {
      const currentTime = viewer.clock.currentTime;
      const speedFactor = viewer.clock.multiplier * 0.0001; // Controlled by Cesium time

      setPosition((prevPos) => {
        const carto = Cartographic.fromCartesian(prevPos);
        let newLongitude = CesiumMath.toDegrees(carto.longitude) + speedFactor;

        // Keep movement within range
        if (newLongitude > -86.775) newLongitude = -86.79;

        const newPos = Cartesian3.fromDegrees(newLongitude, 36.1627, 2000);

        // ✅ Distance from dome center
        const distance = Cartesian3.distance(DOME_POSITION, newPos);
        let newColor = Color.WHITE; // Default

        if (distance > DOME_RADIUS * 1.5) {
          newColor = Color.WHITE; // Far away
        } else if (distance > DOME_RADIUS * 0.75) {
          newColor = Color.YELLOW; // Approaching
        } else {
          newColor = Color.RED; // Inside the dome area
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
    }, 100); // Update every 0.1s

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
