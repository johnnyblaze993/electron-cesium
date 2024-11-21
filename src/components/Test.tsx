// src/Test.tsx
import React from 'react';
import DrawerMenu from './DrawerMenu';  // Import the DrawerMenu component
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Test: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div>
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
    </div>
  );
};

export default Test;
