//@ts-nocheck
import React, { useEffect, useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import DrawerMenu from "../DrawerMenu";
import { useSimulationStore } from "../../stores/simulationStore"; // Zustand store
import Papa from "papaparse";

const TestSimulations = () => {
  const [isLoadingExe, setIsLoadingExe] = useState(false);
  const [isLoadingClear, setIsLoadingClear] = useState(false);
  const [exeFiles, setExeFiles] = useState([]); // State for .exe files
  const { files, message, setFiles, clearFiles, setMessage, refreshFiles } = useSimulationStore(); // Use Zustand store

  // Fetch matching files on component mount
  useEffect(() => {
    refreshFiles();
    fetchExeFiles(); // Fetch .exe files dynamically
  }, [refreshFiles]);

  // Fetch all .exe files from the simulations directory
  const fetchExeFiles = async () => {
    try {
      const simulations = await window.electronAPI.getSimulations(); // Fetch .exe files
      setExeFiles(simulations);
    } catch (error) {
      console.error("Error fetching simulations:", error);
    }
  };

  // Handle running a specific simulation
  const handleRunSimulationExe = async (fileName: string) => {
    setMessage("");
    setIsLoadingExe(true);
    try {
      const result = await window.electronAPI.runSimulationExe(fileName); // Pass the selected file
      console.log(`Simulation ${fileName} Result:`, result);

      if (result.success) {
        setMessage(`Simulation ${fileName} completed successfully.`);
        await refreshFiles(); // Refresh output files after simulation completes
      }
    } catch (error) {
      console.error(`Error running simulation ${fileName}:`, error);
      setMessage(`Failed to run simulation: ${fileName}`);
    } finally {
      setIsLoadingExe(false);
    }
  };

  // Handle clearing simulation output files
  const handleClearSimOutputFiles = async () => {
    setMessage("");
    setIsLoadingClear(true);
    try {
      const result = await window.electronAPI.clearSimOutputFiles();
      if (result.success) {
        clearFiles(); // Clear files in the store
        setMessage("simOutputFiles directory cleared successfully.");
      }
    } catch (err) {
      console.error("Error clearing sim output files:", err);
      setMessage("Failed to clear sim output files.");
    } finally {
      setIsLoadingClear(false);
    }
  };

  // Parse files for CSV and JSON
  const handleParseFile = async (fileName: string) => {
    setMessage("");
    try {
      const fileContents = await window.electronAPI.readFile(fileName);

      if (fileName.endsWith(".csv")) {
        // Parse CSV with PapaParse
        Papa.parse(fileContents, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            console.log(`Parsed CSV Data for ${fileName}:`, result.data);
            setMessage(`File ${fileName} parsed successfully. Check the console for details.`);
          },
          error: (error) => {
            console.error(`Error parsing CSV for ${fileName}:`, error);
            setMessage(`Failed to parse CSV file: ${fileName}`);
          },
        });
      } else if (fileName.endsWith(".json")) {
        try {
          const jsonData = JSON.parse(fileContents);
          const formattedJson = JSON.stringify(jsonData, null, 2);
          console.log(`Formatted JSON Data for ${fileName}:\n`, formattedJson);
          setMessage(`File ${fileName} parsed and formatted successfully. Check the console.`);
        } catch (jsonError) {
          console.error(`Error parsing JSON for ${fileName}:`, jsonError);
          setMessage(`Failed to parse JSON file: ${fileName}`);
        }
      } else {
        setMessage(`Unsupported file type: ${fileName}`);
      }
    } catch (error) {
      console.error(`Error reading file ${fileName}:`, error);
      setMessage(`Failed to read file: ${fileName}`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DrawerMenu />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
        }}
      >
        <Typography variant="h5">Test Simulations</Typography>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Available Simulations
        </Typography>
        {exeFiles.length > 0 ? (
          exeFiles.map((file, index) => (
            <Button
              key={index}
              variant="contained"
              color="primary"
              onClick={() => handleRunSimulationExe(file)}
              sx={{ marginBottom: "10px" }}
            >
              Run {file}
            </Button>
          ))
        ) : (
          <Typography>No simulations found.</Typography>
        )}
      </Box>
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          width: "50%",
        }}
      >
        {files.length > 0 ? (
          <>
            <Typography variant="h5">Matching Files</Typography>
            {files.map((file, index) => (
              <Button
                key={index}
                variant="contained"
                color="primary"
                onClick={() => handleParseFile(file)}
                sx={{ marginBottom: "10px" }}
              >
                {file}
              </Button>
            ))}
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClearSimOutputFiles}
              disabled={isLoadingClear}
              sx={{ marginTop: "20px" }}
            >
              {isLoadingClear ? "Clearing Directory..." : "Clear simOutputFiles Directory"}
            </Button>
          </>
        ) : (
          <Typography>No output files found.</Typography>
        )}
      </Box>
      {message && (
        <Typography
          sx={{ marginTop: "10px", color: message.includes("Failed") ? "red" : "green" }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default TestSimulations;
