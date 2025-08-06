import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchGiftCards = createAsyncThunk(
  "GiftCardsProduct/fetchGiftCardsState",
  async () => {
    const res = await fetch("http://localhost:6500/products/GiftCardsProduct");
    const data = await res.json();
    return data;
  }
);

export const fetchGiftCardsXbox = createAsyncThunk(
  "GiftCardsProduct/fetchGiftCardsXboxState",
  async () => {
    const res = await fetch("http://localhost:6500/products/GiftCardsProduct2");
    const data = await res.json();
    return data;
  }
);

export const GiftCardsProductSlice = createSlice({
  name: "GiftCardsProduct",
  initialState: {
    GiftCardData: [],
    xboxdata: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGiftCards.fulfilled, (state, action) => {
      state.GiftCardData = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchGiftCards.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchGiftCards.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchGiftCardsXbox.fulfilled, (state, action) => {
      state.xboxdata = action.payload;
      state.loading = false;
    });
  },
});

export default GiftCardsProductSlice.reducer;
