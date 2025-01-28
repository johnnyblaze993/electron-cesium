//@ts-nocheck
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSimulationStore } from "../../stores/simulationStore"; // Import the store
import DrawerMenu from "../DrawerMenu";
import DynamicButton from "../DynamicButton";
import Papa from "papaparse";

const TestSimulations = () => {
    const [isLoadingExe, setIsLoadingExe] = useState(false);
    const [isLoadingClear, setIsLoadingClear] = useState(false);
    const { files, message, setFiles, clearFiles, setMessage, refreshFiles } = useSimulationStore(); // Use Zustand store
    const navigate = useNavigate();
    const { t } = useTranslation();
  // Fetch matching files on component mount
  useEffect(() => {
    refreshFiles();
  }, [refreshFiles]);

  const handleRunSimulationExe = async () => {
    setIsLoadingExe(true);
    try {
      const result = await window.electronAPI.runSimulationExe(); // Run EXE simulation
      console.log("EXE Simulation Result:", result);

      if (result.success) {
        await refreshFiles(); // Refresh files after simulation completes
      }
    } catch (error) {
      console.error("Error running EXE Simulation:", error);
    } finally {
      setIsLoadingExe(false);
    }
  };

  const handleClearSimOutputFiles = async () => {
    setIsLoadingClear(true);
    try {
      const result = await window.electronAPI.clearSimOutputFiles();
      if (result.success) {
        clearFiles(); // Clear files in the store
      }
    } catch (err) {
      console.error("Error clearing sim output files:", err);
    } finally {
      setIsLoadingClear(false);
    }
  };

  // Simple console log output of the original file contents
//   const handleParseFile = async (fileName: string) => {
//     try {
//       const fileContents = await window.electronAPI.readFile(fileName);
//       console.log(`File Contents for ${fileName}:`, fileContents);
//     } catch (error) {
//       console.error(`Error reading file ${fileName}:`, error);
//     }
//   };

// using PapaParse to parse CSV and format JSON files
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
        <Typography variant="h5">{t("testSimulations")}</Typography>
        <DynamicButton
          label={isLoadingExe ? "Running EXE Simulation..." : "Run EXE Simulation"}
          onClick={handleRunSimulationExe}
          isLoading={isLoadingExe}
          color="secondary"
          sx={{ marginBottom: "10px" }}
        />
        {files.length > 0 && (
          <DynamicButton
            label={isLoadingClear ? "Clearing Directory..." : "Clear simOutputFiles Directory"}
            onClick={handleClearSimOutputFiles}
            isLoading={isLoadingClear}
            color="secondary"
            sx={{ marginBottom: "10px" }}
          />
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
            <Typography
              sx={{
                width: "100%",
                textAlign: "left",
              }}
              variant="h5"
            >
              {t("matchingFiles")}
            </Typography>
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
          </>
        ) : (
          <Typography>No output files found.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default TestSimulations;
