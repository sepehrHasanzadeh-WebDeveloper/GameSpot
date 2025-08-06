import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductData = createAsyncThunk(
  "productPage/fetchProductDataState",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:6500/products/pages/newItem/${id}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "خطا در گرفتن اطلاعات محصول"
      );
    }
  }
);

export const fetchGiftcardsData = createAsyncThunk(
  "productPage/fetchGiftcardsDataState",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:6500/products/pages/giftCards/${id}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "خطا در گرفتن اطلاعات محصول"
      );
    }
  }
);

export const fetchDisksData = createAsyncThunk(
  "productPage/fetchDisksDataState",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:6500/products/pages/disks/${id}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "خطا در گرفتن اطلاعات محصول"
      );
    }
  }
);
export const fetchConsoleData = createAsyncThunk(
  "productPage/fetchConsoleDataState",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:6500/products/pages/console/${id}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "خطا در گرفتن اطلاعات محصول"
      );
    }
  }
);
const getproductSlice = createSlice({
  name: "productPage",
  initialState: {
    itemData: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.itemData = action.payload;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchGiftcardsData.fulfilled, (state, action) => {
        state.itemData = action.payload;
      })
      .addCase(fetchDisksData.fulfilled, (state, action) => {
        state.itemData = action.payload;
      })
      .addCase(fetchConsoleData.fulfilled, (state, action) => {
        state.itemData = action.payload;
      });
  },
});

export default getproductSlice.reducer;
