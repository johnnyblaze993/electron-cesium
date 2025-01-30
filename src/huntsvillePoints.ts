// huntsvillePoints.ts

import { TargetState } from '../types/types';
export const huntsvillePoints = [
  {
    longitude: -86.5861,
    latitude: 34.7304,
    altitude: 250,
    states: [TargetState.VISIBLE],
    timestamp: 0, // Start of the timeline
  },
  {
    longitude: -86.5855,
    latitude: 34.7312,
    altitude: 255,
    states: [TargetState.ACQUIRED, TargetState.VISIBLE],
    timestamp: 5,
  },
  {
    longitude: -86.5849,
    latitude: 34.7320,
    altitude: 460,
    states: [TargetState.CAN_BE_ACQUIRED],
    timestamp: 10,
  },
  {
    longitude: -86.5843,
    latitude: 34.7328,
    altitude: 265,
    states: [TargetState.DESTROYED],
    timestamp: 15,
  },
];