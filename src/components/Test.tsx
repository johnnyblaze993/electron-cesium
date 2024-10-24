// src/Test.tsx
import React from 'react';
import DrawerMenu from './DrawerMenu';  // Import the DrawerMenu component

const Test: React.FC = () => {
  return (
    <div>
      {/* DrawerMenu is now shared */}
      <DrawerMenu />

      {/* Main content for Test page */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Test Page</h1>
        <p>This is the test comp with drawer.</p>
      </div>
    </div>
  );
};

export default Test;
