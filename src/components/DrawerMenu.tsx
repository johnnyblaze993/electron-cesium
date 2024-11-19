import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RoomIcon from "@mui/icons-material/Room";
import InboxIcon from "@mui/icons-material/Inbox";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RadarIcon from "@mui/icons-material/Radar";
import LayersIcon from "@mui/icons-material/Layers";
import TerrainIcon from "@mui/icons-material/Terrain";

const DrawerMenu: React.FC = () => {
  const { t } = useTranslation(); // Initialize useTranslation
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openMenuItems, setOpenMenuItems] = useState({
    sensors: false,
    sensorCoverages: false,
    weapons: false,
    polygonalAreas: false,
    threats: false,
  });
  const navigate = useNavigate();

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  const handleToggle = (item: keyof typeof openMenuItems) => {
    setOpenMenuItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const navigateAndClose = (path: string, closeDrawer: boolean = true) => {
    navigate(path);
    if (closeDrawer) setIsDrawerOpen(false);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {/* Test Page Link */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateAndClose("/test")}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={t("testPage")} /> {/* Translated */}
          </ListItemButton>
        </ListItem>

        {/* Add Coordinate Link */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateAndClose("/add-coordinate")}>
            <ListItemIcon>
              <RoomIcon />
            </ListItemIcon>
            <ListItemText primary={t("addPoints")} /> {/* Translated */}
          </ListItemButton>
        </ListItem>

        {/* Sensors */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleToggle("sensors")}>
            <ListItemIcon>
              <RadarIcon />
            </ListItemIcon>
            <ListItemText primary={t("sensors")} /> {/* Add key "sensors" */}
            {openMenuItems.sensors ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openMenuItems.sensors} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleToggle("sensorCoverages")}>
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText primary={t("sensorCoverages")} /> {/* Add key */}
                {openMenuItems.sensorCoverages ? <ExpandMoreIcon /> : <ChevronRightIcon />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openMenuItems.sensorCoverages} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigateAndClose("/sensors/sensor-coverages/polar-ground-coverage", false)}
                  >
                    <ListItemText primary={t("polarGroundCoverage")} /> {/* Translated */}
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigateAndClose("/sensors/sensor-coverages/geometric-solid", false)}
                  >
                    <ListItemText primary={t("geometricSolid")} /> {/* Translated */}
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Collapse>

        {/* Polygonal Areas */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleToggle("polygonalAreas")}>
            <ListItemIcon>
              <TerrainIcon />
            </ListItemIcon>
            <ListItemText primary={t("polygonalAreas")} /> {/* Add key */}
            {openMenuItems.polygonalAreas ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openMenuItems.polygonalAreas} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigateAndClose("/polygonal-areas/fob-boundaries", false)}>
                <ListItemText primary={t("fobBoundaries")} /> {/* Translated */}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigateAndClose("/polygonal-areas/protected-areas", false)}>
                <ListItemText primary={t("protectedAreas")} /> {/* Translated */}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigateAndClose("/polygonal-areas/allowable-areas", false)}>
                <ListItemText primary={t("allowableAreas")} /> {/* Translated */}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigateAndClose("/polygonal-areas/nias", false)}>
                <ListItemText primary={t("nias")} /> {/* Translated */}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigateAndClose("/polygonal-areas/ignored-regions", false)}>
                <ListItemText primary={t("ignoredRegions")} /> {/* Translated */}
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        {/* Threats */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleToggle("threats")}>
            <ListItemIcon>
              <RadarIcon />
            </ListItemIcon>
            <ListItemText primary={t("threats")} /> {/* Add key */}
            {openMenuItems.threats ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openMenuItems.threats} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigateAndClose("/threats/threat-specific-graphics", false)}>
                <ListItemText primary={t("threatSpecificGraphics")} /> {/* Translated */}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigateAndClose("/threats/flight-profiles", false)}>
                <ListItemText primary={t("flightProfiles")} /> {/* Translated */}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigateAndClose("/threats/impact-areas", false)}>
                <ListItemText primary={t("impactAreas")} /> {/* Translated */}
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        onClick={toggleDrawer(true)}
        edge="start"
        color="inherit"
        aria-label="menu"
        style={{ position: "absolute", top: "10px", left: "15px" }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default DrawerMenu;
