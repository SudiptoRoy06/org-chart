"use client";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import SearchIcon from "@mui/icons-material/Search";
import { fetchOrgChart } from "@/redux/slices/orgChartSlice";
import { TextField, InputAdornment, Box, Button } from "@mui/material";

export default function SearchBar() {
  const [id, setId] = useState("21");
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        alignItems: { xs: "stretch", sm: "center" },
        mb: 2
      }}
    >
      <TextField
        fullWidth
        placeholder="Search employee by ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          sx: {
            borderRadius: 3
          }
        }}
      />

      <Button
        variant="contained"
        size="large"
        sx={{ borderRadius: 2, px: 4 }}
        onClick={() => id && dispatch(fetchOrgChart(Number(id)))}
      >
        Search
      </Button>

      <Button
        size="large"
        variant="outlined"
        sx={{ borderRadius: 2, px: 4 }}
        onClick={() => {
          setId("");
          dispatch(fetchOrgChart(21));
        }}
      >
        Reset
      </Button>
    </Box>
  );
}
