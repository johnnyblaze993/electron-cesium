//@ts-nocheck
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Stack,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DrawerMenu from './DrawerMenu';
import { useCoordinateStore } from '../stores/coordinateStore';
import { useTranslation } from 'react-i18next';

interface Coordinate {
  longitude: string;
  latitude: string;
}

const AddCoordinate: React.FC = () => {
  const { t } = useTranslation();
  const [coordinate, setCoordinate] = useState<Coordinate>({ longitude: '', latitude: '' });
  const addCoordinate = useCoordinateStore((state) => state.addCoordinate);
  const removeCoordinate = useCoordinateStore((state) => state.removeCoordinate);
  const coordinates = useCoordinateStore((state) => state.coordinates);

  const handleInputChange = (field: string, value: string) => {
    setCoordinate((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addCoordinate(coordinate);
    window.electronAPI.sendCoordinates(coordinate);
    setCoordinate({ longitude: '', latitude: '' });
  };

  const handleDelete = (index: number) => {
    removeCoordinate(index);
    window.electronAPI.deleteCoordinate(index); // Notify Electron
  };

  useEffect(() => {
    const handleCoordinateDeleted = (index: number) => {
      removeCoordinate(index);
    };
  
    window.electronAPI.onCoordinateDeleted(handleCoordinateDeleted);
  
    return () => {
      window.electronAPI.onCoordinateDeleted(handleCoordinateDeleted);
    };
  }, []);
  

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        backgroundColor: (theme) => theme.palette.background.default,
        // alignItems: 'center',
        width: '100vw',

      }}

    >
      {/* Drawer Menu */}
      <DrawerMenu />

      {/* Centered Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Paper
          sx={{
            width: { xs: '100%', sm: '90%', md: '600px' },
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: (theme) => theme.palette.background.paper,
            color: (theme) => theme.palette.text.primary,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            {t('addPoints')}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} mb={3}>
              <TextField
                label={t('longitude')}
                value={coordinate.longitude}
                onChange={(e) => handleInputChange('longitude', e.target.value)}
                required
                fullWidth
              />
              <TextField
                label={t('latitude')}
                value={coordinate.latitude}
                onChange={(e) => handleInputChange('latitude', e.target.value)}
                required
                fullWidth
              />
            </Stack>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 3 }}
            >
              {t('newPoint')}
            </Button>
          </form>

          <Typography variant="h6" align="center" gutterBottom>
            {coordinates.length > 0 ? t('addedPoints') : t('noPoints')}
          </Typography>
          <List
            sx={{
              maxHeight: '200px',
              overflowY: 'auto',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {coordinates.map((coord, index) => (
              <ListItem key={index} disablePadding>
                <Paper
                  elevation={1}
                  sx={{
                    width: '100%',
                    p: 2,
                    mb: 1,
                    backgroundColor: (theme) => theme.palette.grey[400],
                    color: (theme) => theme.palette.text.secondary,
                  }}
                >
                  <ListItemText
                    primary={`Longitude: ${coord.longitude}, Latitude: ${coord.latitude}`}
                    primaryTypographyProps={{ align: 'center' }}
                  />
                  <IconButton onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Paper>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default AddCoordinate;
