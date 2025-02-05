
// SplineEntity.tsx
import React, { useMemo } from "react";
import { Entity, PolylineGraphics } from "resium";
import { CatmullRomSpline, Cartesian3, Color } from "cesium";
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
    // Convert points to Cartesian3 and compute velocities
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

        // Compute Euclidean distance between points
        const distance = Cartesian3.distance(prevPosition, position);
        const timeDiff = point.timestamp - prev.timestamp || 1; // Avoid division by zero

        velocity = distance / timeDiff; // Velocity in meters per second
      }

      return { ...point, position, velocity };
    });

    // Create line segments
    const segments = [];
    for (let i = 0; i < pointsWithVelocity.length - 1; i++) {
      const startPoint = pointsWithVelocity[i];
      const endPoint = pointsWithVelocity[i + 1];

      // Determine segment color based on dominant state
      const dominantState = getDominantState(startPoint.states);
      const color = stateColors[dominantState];

      segments.push({
        start: startPoint.position,
        end: endPoint.position,
        color,
        velocity: startPoint.velocity, // Keep velocity reference for debugging
      });
    }

    return segments;
  }, []);

  return (
    <>
      {lineSegments.map((segment, index) => (
        <Entity key={index}>
          <PolylineGraphics
            positions={[segment.start, segment.end]}
            material={segment.color}
            width={5}
          />
        </Entity>
      ))}
    </>
  );
};

export default SplineEntity;
