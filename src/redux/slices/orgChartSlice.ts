import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/axios";
import type { OrgChartResponse, EmployeeNode } from "@/lib/types";

export const fetchOrgChart = createAsyncThunk(
  "orgChart/fetch",
  async (employeeId: number, { rejectWithValue }) => {
    try {
      const res = await api.get(`/relationship/people_chart/${employeeId}`);
      return res.data;
    } catch (err: any) {
      console.error("API ERROR:", err.response?.data || err.message);
      return rejectWithValue("API failed");
    }
  }
);


const orgChartSlice = createSlice({
  name: "orgChart",
  initialState: {
    data: null as OrgChartResponse | null,
    loading: false,
    error: null as string | null,
    selectedEmployee: null as EmployeeNode | null,
  },

  reducers: {
    setSelectedEmployee(state, action) {
      state.selectedEmployee = action.payload as EmployeeNode | null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgChart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrgChart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchOrgChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching data";
      });
  },
});

export const { setSelectedEmployee } = orgChartSlice.actions;
export default orgChartSlice.reducer;
