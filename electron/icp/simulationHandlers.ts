// electron/ipc/simulationHandlers.ts
import { ipcMain } from "electron";
import { execFile, spawn } from "child_process";
import path from "path";

const simulationsPath = "C:\\Users\\alvarezjo\\Work\\electron-cesium\\simulations";

export function setupSimulationHandlers() {
    ipcMain.handle("run-simulation-exe", async () => {
        return new Promise((resolve, reject) => {
          const exePath = path.join(simulationsPath, "Simulation_v8.exe");
          const process = spawn(exePath);
      
          let output = "";
          let errorOutput = "";
      
          process.stdout.on("data", (data) => {
            output += data.toString();
          });
      
          process.stderr.on("data", (data) => {
            errorOutput += data.toString();
          });
      
          process.on("close", (code) => {
            if (code === 0) {
              console.log("Simulation output:", output);
              resolve(output);
            } else {
              console.error("Simulation error:", errorOutput);
              reject(errorOutput);
            }
          });
        });
      });

  ipcMain.handle("run-simulation-py", async () => {
    return new Promise((resolve, reject) => {
      const pythonPath = "python"; // Ensure Python is in PATH or provide the full path
      const pyFile = path.join(simulationsPath, "Simulation_v8.py");

      const process = spawn(pythonPath, [pyFile]);
      let output = "";
      let errorOutput = "";

      process.stdout.on("data", (data) => {
        output += data.toString();
      });

      process.stderr.on("data", (data) => {
        errorOutput += data.toString();
      });

      process.on("close", (code) => {
        if (code === 0) {
          console.log("Python script output:", output);
          resolve(output);
        } else {
          console.error("Python script error:", errorOutput);
          reject(errorOutput);
        }
      });
    });
  });
}
