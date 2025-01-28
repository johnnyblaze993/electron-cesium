import { ipcMain } from "electron";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

// Define paths
const simulationsPath = "C:\\Users\\alvarezjo\\Work\\electron-cesium\\simulations";
const outputDir = path.join(simulationsPath, "simOutputFiles");

// Ensure the `simOutputFiles` directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

export function setupSimulationHandlers() {
  ipcMain.handle("run-simulation-exe", async () => {
    return new Promise((resolve, reject) => {
      const exePath = path.join(simulationsPath, "Sim_ex_v1");
      const process = spawn(exePath, { cwd: simulationsPath }); // Run simulation in the simulations folder

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
          console.log("Simulation completed successfully.");

          // Move only simulation output files (exclude .exe and .py files)
          const movedFiles = moveFilesToOutputDir();
          console.log(`Moved files to ${outputDir}:`, movedFiles);

          resolve({ success: true, movedFiles });
        } else {
          console.error("Simulation failed.", errorOutput);
          reject({ success: false, error: errorOutput || "Failed to execute simulation." });
        }
      });
    });
  });

  // Handle clearing simulation output files
  ipcMain.handle("clear-sim-output-files", async () => {
    try {
      if (fs.existsSync(outputDir)) {
        const files = fs.readdirSync(outputDir);
  
        // Delete each file
        files.forEach((file) => {
          const filePath = path.join(outputDir, file);
          fs.unlinkSync(filePath); // Remove the file
        });
  
        console.log(`Cleared all files in ${outputDir}`);
      }
      return { success: true }; // Explicitly return success
    } catch (err) {
      console.error(`Failed to clear simOutputFiles: ${err}`);
      throw new Error("Failed to clear simOutputFiles directory.");
    }
  });

  // Helper function to move simulation output files to `simOutputFiles`
  const moveFilesToOutputDir = () => {
    const files = fs.readdirSync(simulationsPath); // Read all files in the simulations folder
    const excludedExtensions = [".exe", ".py"]; // Files to exclude from moving
    const movedFiles: string[] = [];

    files.forEach((file) => {
      const currentPath = path.join(simulationsPath, file);
      const newPath = path.join(outputDir, file);

      // Skip directories and excluded file types
      if (
        fs.lstatSync(currentPath).isFile() &&
        !excludedExtensions.some((ext) => file.endsWith(ext))
      ) {
        fs.renameSync(currentPath, newPath);
        movedFiles.push(file);
      }
    });

    return movedFiles; // Return the list of moved files
  };

  ipcMain.handle("get-matching-files", async () => {
    try {
      // Read all files in the directory
      const files = fs.readdirSync(outputDir);

      // Filter files with "after" in the name and .csv extension
      const matchingFiles = files.filter(
        (file) =>
          file.includes("after") && (file.endsWith(".csv") || file.endsWith(".json"))
      );

      console.log("Matching files:", matchingFiles);

      // Return the matching file names
      return matchingFiles;
    } catch (error) {
      console.error("Error fetching matching files:", error);
      throw error;
    }
  });

  ipcMain.handle("read-file", async (_event, fileName) => {
    try {
      const filePath = path.join(outputDir, fileName);
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${fileName}`);
      }
      const fileContents = fs.readFileSync(filePath, "utf-8");
      return fileContents;
    } catch (error) {
      console.error(`Error reading file ${fileName}:`, error);
      throw error;
    }
  });
}
