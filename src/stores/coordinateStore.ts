// src/coordinateStore.ts

import { create } from 'zustand';

interface Coordinate {
  longitude: string;
  latitude: string;
}

interface CoordinateStore {
  coordinates: Coordinate[];
  addCoordinate: (coordinate: Coordinate) => void;
  removeCoordinate: (index: number) => void;
  setCoordinates: (coordinates: Coordinate[]) => void;
}

export const useCoordinateStore = create<CoordinateStore>((set) => ({
  coordinates: [],
  addCoordinate: (coordinate) =>
    set((state) => ({
      coordinates: [...state.coordinates, coordinate],
    })),
  removeCoordinate: (index) =>
    set((state) => {
      const updatedCoordinates = state.coordinates.filter((_, i) => i !== index);
      return { coordinates: updatedCoordinates };
    }),
  setCoordinates: (coordinates) => set({ coordinates }),
}));