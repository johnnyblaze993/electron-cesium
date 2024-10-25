//@ts-nocheck
import React, { useState } from 'react';
import DrawerMenu from './DrawerMenu';
import { TextField, Button, Box } from '@mui/material';
import { useCoordinateStore } from '../stores/coordinateStore';

interface Coordinate {
    longitude: string;
    latitude: string;
}

const AddCoordinate: React.FC = () => {
    const [coordinate, setCoordinate] = useState<Coordinate>({ longitude: '', latitude: '' });
    const addCoordinate = useCoordinateStore((state) => state.addCoordinate);

    // Handle input changes for longitude and latitude
    const handleInputChange = (field: string, value: string) => {
        setCoordinate({
            ...coordinate,
            [field]: value,
        });
    };

    // Handle form submission (add the point directly)
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        
        // Add the coordinate to Zustand store
        addCoordinate(coordinate);
        
        // Send the single coordinate (not an array) to the Electron main process
        window.electronAPI.sendCoordinates(coordinate);

        // Reset the form for the next point
        setCoordinate({ longitude: '', latitude: '' });
    };

    return (
        <div>
            <DrawerMenu />

            <Box sx={{ padding: '20px', textAlign: 'center' }}>
                <h1>Add Coordinates</h1>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 2 }}>
                        <TextField
                            label="Longitude"
                            value={coordinate.longitude}
                            onChange={(e) => handleInputChange('longitude', e.target.value)}
                            required
                            InputLabelProps={{ style: { color: '#ffffff' } }}
                            InputProps={{ style: { color: '#ffffff', backgroundColor: '#333' } }}
                        />
                        <TextField
                            label="Latitude"
                            value={coordinate.latitude}
                            onChange={(e) => handleInputChange('latitude', e.target.value)}
                            required
                            InputLabelProps={{ style: { color: '#ffffff' } }}
                            InputProps={{ style: { color: '#ffffff', backgroundColor: '#333' } }}
                        />
                    </Box>
                    <Button type="submit" variant="contained" color="primary">
                        Add Point
                    </Button>
                </form>
            </Box>
        </div>
    );
};

export default AddCoordinate;
