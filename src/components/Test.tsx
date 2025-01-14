import React, { useState } from "react";
import DrawerMenu from "./DrawerMenu"; // Import the DrawerMenu component
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { t } = useTranslation();

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
        {isLoadingExe && (
          <p style={{ marginTop: "10px", fontStyle: "italic", color: "gray" }}>
            Please wait, simulation is running...
          </p>
        )}
        {message && <p style={{ marginTop: "10px" }}>{message}</p>}
      </div>
    </div>
  );
};

export default Test;
