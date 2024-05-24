import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSeasons } from "../api/seasons";


export const getSeasonsThunk = createAsyncThunk(
  "Seasons/getSeasons",
  async function getSeasonsAsync() {
    const result = await getSeasons();
    return result.data;
  }
)

const initialState = {
  seasons: [],
  isLoading: false,
  isLoaded: false,
  error: null
}
export const SeasonsSlice = createSlice({
  name: 'SeasonsSlice',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getSeasonsThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getSeasonsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoaded = true;
      // console.log('PASDASDASD', action.payload);
      state.seasons = action.payload;

    });
    builder.addCase(getSeasonsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  }

})
export const {} = SeasonsSlice.actions;
export default SeasonsSlice.reducer;
