// electron/ipc/simulationHandlers.ts
import { ipcMain } from "electron";
import { execFile, spawn } from "child_process";
import path from "path";

const simulationsPath = "C:\\Users\\alvarezjo\\Work\\electron-cesium\\simulations";

export function setupSimulationHandlers() {
    ipcMain.handle("run-simulation-exe", async () => {
        return new Promise((resolve, reject) => {
          const exePath = path.join(simulationsPath, "Sim_ex_v1");
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
}
