"use client";

import { Box } from "@mui/material";
import LeftSidebar from "./org-chart/components/LeftSidebar";

export default function AppClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LeftSidebar />
      <Box sx={{ marginLeft: { xs: 0, sm: 10 }, pt: 2 }}>
        {children}
      </Box>
    </>
  );
}
