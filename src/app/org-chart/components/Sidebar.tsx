// Sidebar.tsx
"use client";
import type { EmployeeNode } from "@/lib/types";
import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setSelectedEmployee } from "@/redux/slices/orgChartSlice";
import { Drawer, Box, Avatar, Typography, IconButton } from "@mui/material";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const selected: EmployeeNode | null = useAppSelector((s) => s.orgChart.selectedEmployee);

  const close = () => dispatch(setSelectedEmployee(null));

  return (
    <Drawer
      anchor="right"
      open={!!selected}
      onClose={close}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 420 },
        },
      }}
    >
      <Box sx={{ width: "100%", p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </Box>

        {selected && (
          <>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Avatar
                src={selected.pic}
                sx={{ width: 90, height: 90, mx: "auto", mb: 2 }}
              />

              <Typography variant="h6">{selected.target}</Typography>
              <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                Employee ID: {selected.employee_id}
              </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">Direct reports</Typography>
                <Typography fontWeight={600}>{selected.direct_reports}</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">Indirect reports</Typography>
                <Typography fontWeight={600}>{selected.indirect_reports}</Typography>
              </Box>

              {/* Add more fields as needed */}
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}
