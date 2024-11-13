"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCoordinateStore = void 0;
// src/coordinateStore.ts
// @ts-nocheck
const zustand_1 = require("zustand");
exports.useCoordinateStore = (0, zustand_1.create)((set) => ({
    coordinates: [], // Initial empty array of coordinates
    addCoordinate: (coordinate) => set((state) => {
        const updatedCoordinates = [...state.coordinates, coordinate];
        console.log('Updated coordinates after adding:', updatedCoordinates);
        return {
            coordinates: updatedCoordinates,
        };
    }),
    setCoordinates: (coordinates) => set(() => {
        console.log('Setting new coordinates:', coordinates);
        return {
            coordinates,
        };
    }),
}));
