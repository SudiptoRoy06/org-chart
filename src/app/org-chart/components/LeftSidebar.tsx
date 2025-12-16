"use client";

import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import WalletIcon from "@mui/icons-material/Wallet";
import SettingsIcon from "@mui/icons-material/Settings";
import DescriptionIcon from "@mui/icons-material/Description";
import { Box, IconButton, Link, Tooltip } from "@mui/material";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

export default function LeftSidebar() {
  return (
    <Box
      sx={{
        width: { xs: 0, sm: 70 },
        height: "100vh",
        borderRight: "1px solid #eee",
        display: { xs: "none", sm: "flex" },
        flexDirection: "column",
        alignItems: "center",
        py: 2,
        position: "fixed",
        top: 0,
        left: 0,
        background: "#fff",
        zIndex: 1000,
      }}
    >
      {/* Top grid icon */}
      <Link href="/" underline="none">
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            background: "#000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
            cursor: "pointer",
          }}
        >
          <DashboardCustomizeIcon sx={{ color: "#fff" }} />
        </Box>
      </Link>

      {/* Menu Icons */}
      <Link href="/org-chart" underline="none">
        <SidebarIcon icon={<HomeIcon />} label="Home" active />
      </Link>
      <SidebarIcon icon={<PeopleIcon />} label="People" />
      <SidebarIcon icon={<WalletIcon />} label="Wallet" />
      <SidebarIcon icon={<DescriptionIcon />} label="Docs" />
      <SidebarIcon icon={<SettingsIcon />} label="Settings" />

      {/* Bottom section */}
      <Box sx={{ flexGrow: 1 }} />
      <SidebarIcon icon={<SettingsIcon />} label="Admin" />
      <SidebarIcon icon={<PeopleIcon />} label="Users" />
    </Box>
  );
}

function SidebarIcon({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Tooltip title={label} placement="right">
      <IconButton
        sx={{
          my: 1,
          width: 48,
          height: 48,
          borderRadius: 2,
          background: active ? "#f5f7ff" : "transparent",
          border: active ? "1px solid #d0d7ff" : "none",
          color: active ? "#1a73e8" : "#777",
          "&:hover": {
            background: "#f1f1f1",
          },
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}
