import React, { useState } from 'react';
import DrawerMenu from './DrawerMenu';  
import { TextField, Button, Box } from '@mui/material';

interface Coordinate {
  longitude: string;
  latitude: string;
}

const AddCoordinate: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinate[]>([{ longitude: '', latitude: '' }]);

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

    // Send the coordinates to the main Electron process via ipcRenderer
    //@ts-ignore
    window.electronAPI.sendCoordinates(coordinates);

    console.log('Submitted Coordinates:', coordinates); // Log the coordinates
  };

  //disable button if we have less than 3 coordinates
    const disableButton = coordinates.length < 3;

  return (
    <div>
      <DrawerMenu />
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
          <Button type="submit" variant="contained" color="primary" disabled={disableButton}>
            Submit Coordinates
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default AddCoordinate;
