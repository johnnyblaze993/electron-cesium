import { Entity, PointGraphics } from "resium";
import { Color, Cartesian3 } from "cesium";
import React, { useEffect, useRef } from "react";

interface PointEntityProps {
  coordinates: Array<{ latitude: string; longitude: string }>;
}

const PointEntity = ({ coordinates }: PointEntityProps) => {
  const previousCoordinates = useRef(coordinates);

  useEffect(() => {
    // Log changes to coordinates for debugging
    console.log("Updated coordinates in PointEntity:", coordinates);

    // Update the ref to store the current coordinates
    previousCoordinates.current = coordinates;
  }, [coordinates]);

  return (
    <>
      {coordinates.map((coord, index) => (
        <Entity
          key={index}
          position={Cartesian3.fromDegrees(
            parseFloat(coord.longitude),
            parseFloat(coord.latitude),
            0
          )}
        >
          <PointGraphics pixelSize={10} color={Color.RED} />
        </Entity>
      ))}
    </>
  );
};

export default PointEntity;
