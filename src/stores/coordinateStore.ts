// src/coordinateStore.ts
// @ts-nocheck
import { create } from 'zustand';

interface Coordinate {
  longitude: string;
  latitude: string;
}

interface CoordinateStore {
  coordinates: Coordinate[];
  addCoordinate: (coordinate: Coordinate) => void;
  setCoordinates: (coordinates: Coordinate[]) => void;
}

export const useCoordinateStore = create<CoordinateStore>((set) => ({
  coordinates: [],  // Initial empty array of coordinates
  addCoordinate: (coordinate) =>
    set((state) => {
      const updatedCoordinates = [...state.coordinates, coordinate];
      console.log('Updated coordinates after adding:', updatedCoordinates);
      return {
        coordinates: updatedCoordinates,
      };
    }),
  setCoordinates: (coordinates) =>
    set(() => {
      console.log('Setting new coordinates:', coordinates);
      return {
        coordinates,
      };
    }),
}));