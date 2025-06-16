import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSizes } from "../api/sizes";


export const getSizesThunk = createAsyncThunk(
  "Sizes/getSizes",
  async function getSizesAsync() {
    const result = await getSizes();
    return result.data;
  }
)

const initialState = {
  sizes: [],
  isLoading: false,
  isLoaded: false,
  error: null
}
export const SizesSlice = createSlice({
  name: 'SizesSlice',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getSizesThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getSizesThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoaded = true;
      state.sizes = action.payload;

    });
    builder.addCase(getSizesThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  }

})
export const {} = SizesSlice.actions;
export default SizesSlice.reducer;
