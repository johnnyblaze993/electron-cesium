// src/global.d.ts
export {};

declare global {
  interface Window {
    electronAPI: {
      openTestWindow: () => void;
    };
  }
}