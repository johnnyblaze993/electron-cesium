import React, { useState } from "react";
import { Box, Slider, Typography } from "@mui/material";

const OpacitySlider: React.FC = () => {
    const [opacity, setOpacity] = useState(0.8); // Initial opacity state

    const handleOpacityChange = (_event: Event, newValue: number | number[]) => {
        const newOpacity = Array.isArray(newValue) ? newValue[0] : newValue;
        setOpacity(newOpacity);
        (window as any).electronAPI.setWindowOpacity(newOpacity);
    };

    return (
        <Box
            sx={{
                position: "absolute",
                top: "10px",
                left: "18%",
                transform: "translateX(-50%)",
                width: 100,
                bgcolor: "white",
                paddingLeft: 1,
                paddingRight: 1,
                borderRadius: 2,
                boxShadow: 2,
            }}
        >
            <Typography sx={{
                fontSize: 12,
            }} align="center">Window Opacity</Typography>
            <Slider
                value={opacity}
                onChange={handleOpacityChange}
                min={0.2} // Prevent full transparency
                max={1.0}
                step={0.05}
                aria-labelledby="opacity-slider"
            />
        </Box>
    );
};

export default OpacitySlider;
