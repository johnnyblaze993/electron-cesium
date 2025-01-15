//@ts-nocheck

import React, { useState, useEffect } from "react";
import DrawerMenu from "./DrawerMenu"; // Import the DrawerMenu component
import { useTranslation } from "react-i18next";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";

const handleTestEndpointCall = async () => {
  try {
    const response = await (window as any).electronAPI.callTestEndpoint(); // Use the exposed IPC function
    console.log("Response from /electronTestEndpoint:", response);
    alert(`Response: ${response}`);
  } catch (error) {
    console.error("Error calling /electronTestEndpoint:", error);
    alert("Failed to call the endpoint. Check the console for details.");
  }
};

const Test: React.FC = () => {
  const [message, setMessage] = useState(""); // Success or error message
  const [isLoading, setIsLoading] = useState(false); // Manage loading state for clearing files
  const [isLoadingExe, setIsLoadingExe] = useState(false); // Manage loading state for EXE simulation
  const [files, setFiles] = useState([]); // List of matching files
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Fetch matching files on component mount
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const matchingFiles = await window.electronAPI.getMatchingFiles();
        setFiles(matchingFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
        setMessage("Failed to fetch files. Check the console for details.");
      }
    };

    fetchFiles();
  }, []);

  const handleRunSimulationExe = async () => {
    setMessage("");
    setIsLoadingExe(true);
    try {
      const result = await (window as any).electronAPI.runSimulationExe(); // Run EXE simulation
      console.log("EXE Simulation Result:", result);
      setMessage("EXE Simulation completed successfully.");
    } catch (error) {
      console.error("Error running EXE Simulation:", error);
      setMessage("Failed to run EXE Simulation. Check the console for details.");
    } finally {
      setIsLoadingExe(false);
    }
  };

  const handleClearSimOutputFiles = async () => {
    setMessage("");
    setIsLoading(true);
    try {
      await window.electronAPI.clearSimOutputFiles();
      setMessage("simOutputFiles directory cleared successfully.");
    } catch (err) {
      console.error(err);
      setMessage("Failed to clear simOutputFiles directory.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file parsing and logging
  const handleParseFile = async (fileName: string) => {
    setMessage("");
    try {
      const fileContents = await window.electronAPI.readFile(fileName);
      Papa.parse(fileContents, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          console.log(`Parsed Data for ${fileName}:`, result.data);
          setMessage(`File ${fileName} parsed successfully. Check the console for details.`);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
          setMessage(`Failed to parse file: ${fileName}`);
        },
      });
    } catch (error) {
      console.error(`Error reading file ${fileName}:`, error);
      setMessage(`Failed to read file: ${fileName}`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        alignItems: "center",
      }}
    >
      {/* DrawerMenu is now shared */}
      <DrawerMenu />

      {/* Main content for Test page */}
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>{t("testPage")}</h1>
        <p>{t("thisIsTheTestCompWithDrawer")}</p>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/menu-tree-parameter-groups")}
      >
        Go to Menu Tree Parameter Groups
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleTestEndpointCall}
        style={{ marginTop: "10px" }}
      >
        Test Electron Endpoint
      </Button>

      {/* Simulation Buttons */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "10px",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleRunSimulationExe}
          disabled={isLoadingExe}
          style={{ marginBottom: "10px" }}
        >
          {isLoadingExe ? "Running EXE Simulation..." : "Run EXE Simulation"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClearSimOutputFiles}
          disabled={isLoading}
        >
          {isLoading ? "Clearing Directory..." : "Clear simOutputFiles Directory"}
        </Button>
        {files.length > 0 && (
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6">Select a File:</Typography>
            {files.map((file, index) => (
              <Button
                key={index}
                variant="contained"
                color="primary"
                onClick={() => handleParseFile(file)}
                sx={{ margin: 1 }}
              >
                {file}
              </Button>
            ))}
          </Box>
        )}
        {isLoadingExe && (
          <p style={{ marginTop: "10px", fontStyle: "italic", color: "gray" }}>
            Please wait, simulation is running...
          </p>
        )}
        {message && (
          <p style={{ marginTop: "10px", color: message.includes("Failed") ? "red" : "green" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Test;
