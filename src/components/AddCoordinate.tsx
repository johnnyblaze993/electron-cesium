//@ts-nocheck
import React, { useState } from 'react';
import DrawerMenu from './DrawerMenu';
import { TextField, Button, Box, List, ListItem, ListItemText, Typography, Paper, Stack } from '@mui/material';
import { useCoordinateStore } from '../stores/coordinateStore';

interface Coordinate {
    longitude: string;
    latitude: string;
}

const AddCoordinate: React.FC = () => {
    const [coordinate, setCoordinate] = useState<Coordinate>({ longitude: '', latitude: '' });
    const addCoordinate = useCoordinateStore((state) => state.addCoordinate);
    const coordinates = useCoordinateStore((state) => state.coordinates);

    const handleInputChange = (field: string, value: string) => {
        setCoordinate({
            ...coordinate,
            [field]: value,
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addCoordinate(coordinate);
        window.electronAPI.sendCoordinates(coordinate);
        setCoordinate({ longitude: '', latitude: '' });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                // backgroundColor: '#121212',
                overflow: 'hidden',
            }}
        >
            <DrawerMenu />

            <Paper
                sx={{
                    width: '100%',
                    maxWidth: 600,
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: '#1e1e1e',
                    color: '#e0e0e0',
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Add Coordinates
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} direction="row" justifyContent="center" mb={2}>
                        <TextField
                            label="Longitude"
                            value={coordinate.longitude}
                            onChange={(e) => handleInputChange('longitude', e.target.value)}
                            required
                            InputLabelProps={{ style: { color: '#b0b0b0' } }}
                            InputProps={{ style: { color: '#e0e0e0', backgroundColor: '#333' } }}
                        />
                        <TextField
                            label="Latitude"
                            value={coordinate.latitude}
                            onChange={(e) => handleInputChange('latitude', e.target.value)}
                            required
                            InputLabelProps={{ style: { color: '#b0b0b0' } }}
                            InputProps={{ style: { color: '#e0e0e0', backgroundColor: '#333' } }}
                        />
                    </Stack>
                    <Button type="submit" variant="contained" color="primary" sx={{ marginBottom: 3,
                    width: '70%', marginLeft: '15%'

                     }}>
                        Add Point
                    </Button>
                </form>

                {/* Display added coordinates in Material-UI Papers */}
                <Typography variant="h6" align="center" gutterBottom>
              {
                coordinates.length > 0
                  ? 'Added Coordinates'
                  : 'No Coordinates Added Yet'
              }
                </Typography>
                <List>
                    {coordinates.map((coord, index) => (
                        <ListItem key={index} disablePadding>
                            <Paper
                                elevation={1}
                                sx={{
                                    width: '100%',
                                    padding: 2,
                                    marginBottom: 1,
                                    backgroundColor: '#333',
                                    color: '#e0e0e0',
                                }}
                            >
                                <ListItemText
                                    primary={`Longitude: ${coord.longitude}, Latitude: ${coord.latitude}`}
                                    primaryTypographyProps={{ align: 'center' }}
                                />
                            </Paper>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default AddCoordinate;
