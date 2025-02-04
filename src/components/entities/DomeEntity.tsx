// DomeEntity.tsx
import React from "react";
import { Entity, EllipsoidGraphics } from "resium";
import { Cartesian3, Color } from "cesium";

const DomeEntity: React.FC = () => {
  return (
    <Entity
      name="Nashville Dome"
      position={Cartesian3.fromDegrees(-86.7816, 36.1627, 0)} // Nashville, TN (Ground level)
    >
      <EllipsoidGraphics
        radii={new Cartesian3(500, 500, 250)} // Full dome shape
        material={Color.LIGHTBLUE.withAlpha(0.5)} // Light blue, semi-transparent
      />
    </Entity>
  );
};

export default DomeEntity;
