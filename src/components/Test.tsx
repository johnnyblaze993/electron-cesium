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
    </div>
  );
};

export default Test;
