//@ts-nocheck
import { create } from "zustand";

interface SimulationStore {
  files: string[]; // List of simulation files
  setFiles: (files: string[]) => void; // Update the file list
  clearFiles: () => void; // Clear the file list
  refreshFiles: () => Promise<void>; // Fetch the latest files from the backend
}

export const useSimulationStore = create<SimulationStore>((set) => ({
  files: [],

  setFiles: (files) => set({ files }),

  clearFiles: () => set({ files: [] }),

  refreshFiles: async () => {
    try {
      const matchingFiles = await window.electronAPI.getMatchingFiles();
      set({ files: matchingFiles });
    } catch (error) {
      console.error("Error refreshing simulation files:", error);
    }
  },
}));
