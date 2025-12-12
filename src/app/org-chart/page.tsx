"use client";
import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import TuneIcon from "@mui/icons-material/Tune";
import OrgChartTree from "./components/OrgChartTree";
import BreadCrumb from "./components/BreadCrumb/BreadCrumb";
import { fetchOrgChart } from "@/redux/slices/orgChartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Box, ThemeProvider, createTheme, CssBaseline, Tabs, Tab, IconButton } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    background: { default: "#F6F7F9" },
    primary: { main: "#4F46E5" },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
  },
});

export default function OrgChartPage() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((s) => s.orgChart); 

  useEffect(() => {
    dispatch(fetchOrgChart(21));
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BreadCrumb />
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        {/* HEADER */}
        <Box sx={{ mb: 3 }}>
          <Box component="h1" sx={{ fontSize: 28, fontWeight: 700, mb: 1 }}>
            Org Chart
          </Box>
          <Box sx={{ color: "text.secondary", maxWidth: 640 }}>
            This is a collection of all hierarchy in the system, you can view or modify datasets based on preferences.
          </Box>
        </Box>
        
        {/* TABS */}
        <Tabs value={0} sx={{ borderBottom: "1px solid #eee", mb: 2 }}>
          <Tab label="People" />
          <Tab label="Position" />
          <Tab label="Organization" />
          <Tab label="Others" />
        </Tabs>

        {/* SEARCH */}
        <SearchBar />

        {/* ACTIONS */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 2 }}>
          <IconButton><TuneIcon /></IconButton>
        </Box>

        {/* MAIN AREA */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            {loading && <Box sx={{ py: 10, textAlign: "center" }}>Loading...</Box>}
            {!loading && error && <Box sx={{ py: 10, textAlign: "center", color: "error.main" }}>Error: {String(error)}</Box>}
            {!loading && !data && !error && <Box sx={{ py: 10, textAlign: "center" }}>No data — try search or reset</Box>}
            
            {data && (
              <OrgChartTree data={data} />
            )}
          </Box>
          <Sidebar />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
