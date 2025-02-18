import React, { useMemo } from "react";
import { Entity, PolylineGraphics, PointGraphics } from "resium";
import { Cartesian3, Color, NearFarScalar } from "cesium";
import { huntsvillePoints } from "../../huntsvillePoints";
import { TargetState } from "../../../types/types";

// Define color mapping for states
const stateColors: Record<TargetState, Color> = {
  [TargetState.VISIBLE]: Color.YELLOW,
  [TargetState.ACQUIRED]: Color.GREEN,
  [TargetState.CAN_BE_ACQUIRED]: Color.BLUE,
  [TargetState.DESTROYED]: Color.RED,
};

// Function to determine the dominant state
const getDominantState = (states: TargetState[]) => {
  const priority = [
    TargetState.DESTROYED,
    TargetState.ACQUIRED,
    TargetState.CAN_BE_ACQUIRED,
    TargetState.VISIBLE,
  ];
  return states.find((state) => priority.includes(state)) || TargetState.VISIBLE;
};

const SplineEntity: React.FC = () => {
  const lineSegments = useMemo(() => {
    const pointsWithVelocity = huntsvillePoints.map((point, index, arr) => {
      const position = Cartesian3.fromDegrees(
        point.longitude,
        point.latitude,
        point.altitude
      );

      let velocity = 0;
      if (index > 0) {
        const prev = arr[index - 1];
        const prevPosition = Cartesian3.fromDegrees(
          prev.longitude,
          prev.latitude,
          prev.altitude
        );

        const distance = Cartesian3.distance(prevPosition, position);
        const timeDiff = point.timestamp - prev.timestamp || 1;

        velocity = distance / timeDiff;
      }

      return { ...point, position, velocity };
    });

    const segments = [];
    for (let i = 0; i < pointsWithVelocity.length - 1; i++) {
      const startPoint = pointsWithVelocity[i];
      const endPoint = pointsWithVelocity[i + 1];

      const dominantState = getDominantState(startPoint.states);
      const color = stateColors[dominantState];

      segments.push({
        start: startPoint.position,
        end: endPoint.position,
        color,
        velocity: startPoint.velocity,
      });
    }

    return segments;
  }, []);

  return (
    <>
      {/* Draw the spline */}
      {lineSegments.map((segment, index) => (
        <Entity key={index}>
          <PolylineGraphics
            positions={[segment.start, segment.end]}
            material={segment.color}
            width={5}
          />
        </Entity>
      ))}

      {/* Add points with scaling by distance */}
      {huntsvillePoints.map((point, index) => (
        <Entity key={`point-${index}`} position={Cartesian3.fromDegrees(point.longitude, point.latitude, point.altitude)}>
          <PointGraphics
            pixelSize={10} // Base size
            color={Color.WHITE}
            scaleByDistance={new NearFarScalar(1000, 2.0, 10000000, 0.5)} 
            // Near: at 1000m, scale is 2x (20px)
            // Far: at 10,000,000m (10,000km), scale is 0.5x (5px)
            outlineColor={Color.BLACK}
            outlineWidth={1}
          />
        </Entity>
      ))}
    </>
  );
};

export default SplineEntity;
