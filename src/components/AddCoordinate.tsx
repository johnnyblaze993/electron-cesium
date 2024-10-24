// src/AddCoordinate.tsx
import React from 'react';
import DrawerMenu from './DrawerMenu';  // Import the DrawerMenu component

const AddCoordinate: React.FC = () => {
  return (
    <div>
      {/* DrawerMenu is now shared */}
      <DrawerMenu />

      {/* Main content for AddCoordinate page */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Coordinate Page</h1>
        <p>This is where you can add coordinates.</p>
      </div>
    </div>
  );
};

export default AddCoordinate;
