// src/Test.tsx
import React from 'react';
import DrawerMenu from './DrawerMenu';  // Import the DrawerMenu component
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const handleTestEndpointCall = async () => {
  try {
    const response = await (window as any).electronAPI.callTestEndpoint(); // Use the exposed IPC function
    console.log('Response from /electronTestEndpoint:', response);
    alert(`Response: ${response}`);
  } catch (error) {
    console.error('Error calling /electronTestEndpoint:', error);
    alert('Failed to call the endpoint. Check the console for details.');
  }
};

const handleRunSimulationExe = async () => {
  try {
    const result = await (window as any).electronAPI.runSimulationExe(); // Run EXE simulation
    console.log('EXE Simulation Result:', result);
    alert(`EXE Simulation completed: ${result}`);
  } catch (error) {
    console.error('Error running EXE Simulation:', error);
    alert('Failed to run EXE Simulation. Check the console for details.');
  }
};

// const handleRunSimulationPy = async () => {
//   try {
//     const result = await (window as any).electronAPI.runSimulationPy(); // Run Python simulation
//     console.log('Python Simulation Result:', result);
//     alert(`Python Simulation completed: ${result}`);
//   } catch (error) {
//     console.error('Error running Python Simulation:', error);
//     alert('Failed to run Python Simulation. Check the console for details.');
//   }
// };

const Test: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div style={
      {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        alignItems: 'center',
      }
    }>
      {/* DrawerMenu is now shared */}
      <DrawerMenu />

      {/* Main content for Test page */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        {/* <h1>Test Page</h1> */}
        <h1>{t('testPage')}</h1>
        {/* <p>This is the test comp with drawer.</p> */}
        <p>{t('thisIsTheTestCompWithDrawer')}</p>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/menu-tree-parameter-groups')}
      >
        Go to Menu Tree Parameter Groups
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleTestEndpointCall}
        style={{ marginTop: '10px' }}
      >
        Test Electron Endpoint
      </Button>
          {/* Simulation Buttons */}
          <div style={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '10px',
           }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleRunSimulationExe}
          style={{ marginBottom: '10px' }}
        >
          Run EXE Simulation
        </Button>
        {/* <Button
          variant="contained"
          color="secondary"
          onClick={handleRunSimulationPy}
        >
          Run Python Simulation
        </Button> */}
      </div>
    </div>
  );
};

export default Test;
