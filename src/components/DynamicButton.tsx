import React from "react";
import { Button, CircularProgress, ButtonProps } from "@mui/material";

interface DynamicButtonProps extends ButtonProps {
  isLoading?: boolean; // Indicates loading state
  label: string; // Button text
  onClick: () => void; // Click handler
}

const DynamicButton: React.FC<DynamicButtonProps> = ({
  isLoading = false,
  label,
  onClick,
  ...props
}) => {
  return (
    <Button
      variant="contained"
      disabled={isLoading}
      onClick={onClick}
      {...props}
      sx={{
        position: "relative",
        ...(props.sx || {}),
      }}
    >
      {isLoading ? (
        <CircularProgress
          size={24}
          sx={{
            color: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      ) : (
        label
      )}
    </Button>
  );
};

export default DynamicButton;
