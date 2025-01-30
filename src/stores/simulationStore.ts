
import { create } from "zustand";

interface SimulationStore {
  files: string[]; // List of simulation files
  message: string; // Success or error message
  setFiles: (files: string[]) => void; // Update the file list
  clearFiles: () => void; // Clear the file list
  setMessage: (message: string) => void; // Set a success/error message
  refreshFiles: () => Promise<void>; // Fetch the latest files from the backend
}

export const useSimulationStore = create<SimulationStore>((set) => ({
  files: [],
  message: "",

  setFiles: (files) => set({ files }),

  clearFiles: () => set({ files: [], message: "" }),

  setMessage: (message) => set({ message }),

  refreshFiles: async () => {
    try {
            //@ts-ignore
      const matchingFiles = await window.electronAPI.getMatchingFiles();
      set({ files: matchingFiles });
    } catch (error) {
      console.error("Error refreshing simulation files:", error);
      set({ message: "Failed to refresh simulation files. Check the console." });
    }
  },
}));
