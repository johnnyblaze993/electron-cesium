

import React, { useState } from "react";
import DrawerMenu from "../DrawerMenu"; // Import the DrawerMenu component
import { useTranslation } from "react-i18next";
import DynamicButton from "../DynamicButton"; // Import the DynamicButton component
import { useNavigate } from "react-router-dom";
import { Slider, Typography, Box } from "@mui/material";

const handleTestEndpointCall = async () => {
  try {
    const response = await (window as any).electronAPI.callTestEndpoint();
    console.log("Response from /electronTestEndpoint:", response);
    alert(`Response: ${response}`);
  } catch (error) {
    console.error("Error calling /electronTestEndpoint:", error);
    alert("Failed to call the endpoint. Check the console for details.");
  }
};

const Test: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [opacity, setOpacity] = useState(0.8); // Initial opacity state

  const handleOpacityChange = (_event: Event, newValue: number | number[]) => {
    const newOpacity = Array.isArray(newValue) ? newValue[0] : newValue;
    setOpacity(newOpacity);
    (window as any).electronAPI.setWindowOpacity(newOpacity);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
      }}
    >
      <DrawerMenu />
      {/* Opacity Slider - Positioned at the top center */}
      <Box
        sx={{
          width: 300,
          bgcolor: "white",
          p: 1,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography gutterBottom align="center">Window Opacity</Typography>
        <Slider
          value={opacity}
          onChange={handleOpacityChange}
          min={0.2} // Prevent full transparency
          max={1.0}
          step={0.05}
          aria-labelledby="opacity-slider"
        />
      </Box>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>{t("testPage")}</h1>
        <p>{t("thisIsTheTestCompWithDrawer")}</p>
      </div>
      <DynamicButton
        label="Go to Menu Tree Parameter Groups"
        onClick={() => navigate("/menu-tree-parameter-groups")}
        sx={{
          marginBottom: "10px",
          width: "50%",
        }}
      />
      <DynamicButton
        label="Test Electron Endpoint"
        onClick={() => handleTestEndpointCall()}
        sx={{ marginBottom: "10px",
          width: "50%", }}
      />

      <DynamicButton
        label="Go to Test Simulations"
        onClick={() => navigate("/test-simulations")}
        sx={{ marginBottom: "10px",
          width: "50%", }}
      />

    </div>
  );
};

export default Test;
