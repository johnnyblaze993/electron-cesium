import { Entity, PointGraphics } from "resium";
import { Color, Cartesian3 } from "cesium";
import React from "react";

interface PointEntityProps {
  coordinates: Array<{ latitude: string; longitude: string }>;
}

const PointEntity = ({ coordinates }: PointEntityProps) => {
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
