import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPsDisk = createAsyncThunk(
  "Disk/fetchPsDiskState",
  async () => {
    const res = await fetch("http://localhost:6500/products/disksDataProduct");
    const data1 = await res.json();
    return data1;
  }
);
export const fetchXboxDisk = createAsyncThunk(
  "Disk/fetchXboxDiskState",
  async () => {
    const res = await fetch(
      "http://localhost:6500/products/xboxdiskDataProduct"
    );
    const data2 = await res.json();
    return data2;
  }
);

export const fetchConsoles = createAsyncThunk(
  "Disk/fetchConsolesState",
  async () => {
    const res = await fetch("http://localhost:6500/products/AllConsoles");
    const data3 = await res.json();
    return data3;
  }
);

export const disksDataSlice = createSlice({
  name: "Disk",
  initialState: {
    DiskDataps: [],
    DiskDataxb: [],
    ConsoleDatas: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPsDisk.fulfilled, (state, action) => {
      state.DiskDataps = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPsDisk.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPsDisk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchXboxDisk.fulfilled, (state, action) => {
      state.DiskDataxb = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchConsoles.fulfilled, (state, action) => {
      state.ConsoleDatas = action.payload;

      state.loading = false;
    });
  },
});

export default disksDataSlice.reducer;
