"use client";
import React from "react";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";

export default function Controls({ scale, setScale }: { scale: number; setScale: (n:number)=>void }) {
  return (
    <Box sx={{ display: "flex", gap: 1, p: 2, alignItems: "center", justifyContent: "flex-end" }}>
      <Tooltip title="Zoom out">
        <IconButton onClick={() => setScale(Math.max(0.25, +(scale - 0.1).toFixed(2)))}>
          <ZoomOutIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Zoom in">
        <IconButton onClick={() => setScale(Math.min(2, +(scale + 0.1).toFixed(2)))}>
          <ZoomInIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Reset">
        <IconButton onClick={() => setScale(1)}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>

      <Typography variant="body2" sx={{ ml: 1, color: "text.secondary" }}>
        {(scale * 100).toFixed(0)}%
      </Typography>
    </Box>
  );
}
