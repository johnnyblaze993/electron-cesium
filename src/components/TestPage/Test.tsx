

import React from "react";
import DrawerMenu from "../DrawerMenu"; // Import the DrawerMenu component
import { useTranslation } from "react-i18next";
import DynamicButton from "../DynamicButton"; // Import the DynamicButton component
import { useNavigate } from "react-router-dom";

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
