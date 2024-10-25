//@ts-nocheck
import React, { useState } from 'react';
import DrawerMenu from './DrawerMenu';  // Import the DrawerMenu component
import { TextField, Button, Box } from '@mui/material';
import { useCoordinateStore } from '../stores/coordinateStore';  // Import Zustand store

interface Coordinate {
  longitude: string;
  latitude: string;
}

const AddCoordinate: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([{ longitude: '', latitude: '' }]);
  const addCoordinate = useCoordinateStore((state) => state.addCoordinate);  // Zustand function to add a coordinate

  // Handle input changes for longitude and latitude
  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedCoordinates = [...coordinates];
    updatedCoordinates[index] = { ...updatedCoordinates[index], [field]: value };
    setCoordinates(updatedCoordinates);
  };

  // Add a new coordinate input field
  const handleAddPoint = () => {
    setCoordinates([...coordinates, { longitude: '', latitude: '' }]);
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    coordinates.forEach((coordinate) => {
      addCoordinate(coordinate);  // Add each coordinate to Zustand store
    });

    // Send the coordinates to the main window via ipcRenderer
    window.electronAPI.sendCoordinates(coordinates);

    console.log('Submitted Coordinates:', coordinates); // Log the coordinates to verify
  };

  return (
    <div>
      {/* DrawerMenu for navigation */}
      <DrawerMenu />

      {/* Form for adding coordinates */}
      <Box sx={{ padding: '20px', textAlign: 'center' }}>
        <h1>Add Coordinates</h1>
        <form onSubmit={handleSubmit}>
          {coordinates.map((coord, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 2 }}>
              <TextField
                label="Longitude"
                value={coord.longitude}
                onChange={(e) => handleInputChange(index, 'longitude', e.target.value)}
                required
              />
              <TextField
                label="Latitude"
                value={coord.latitude}
                onChange={(e) => handleInputChange(index, 'latitude', e.target.value)}
                required
              />
            </Box>
          ))}
          <Button type="button" onClick={handleAddPoint} variant="outlined" sx={{ marginBottom: 2 }}>
            Add Another Point
          </Button>
          <br />
          <Button type="submit" variant="contained" color="primary">
            Submit Coordinates
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default AddCoordinate;
