//@ts-nocheck

import React from "react";
import { Button, Box, Typography } from "@mui/material";


const SimulationButton: React.FC = () => {
  const runSimulationExe = async () => {
    try {
      const result = await window.electronAPI.runSimulationExe();
      console.log("Simulation EXE Result:", result);
    } catch (error) {
      console.error("Error running EXE:", error);
    }
  };

  const runSimulationPy = async () => {
    try {
      const result = await window.electronAPI.runSimulationPy();
      console.log("Simulation PY Result:", result);
    } catch (error) {
      console.error("Error running Python script:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">Run Simulations</Typography>
      <Button variant="contained" color="primary" onClick={runSimulationExe}>
        Run EXE Simulation
      </Button>
      <Button variant="contained" color="secondary" onClick={runSimulationPy}>
        Run Python Simulation
      </Button>
    </Box>
  );
};

export default SimulationButton;
